(function () {
  const LLM_CONFIG = {
    provider: "ollama",
    model: "gemma4:e4b",
    fallbackModels: ["qwen2.5:7b", "llama3.1:latest"],
    baseUrl: "http://127.0.0.1:11434",
    timeoutMs: 90000
  };

  class TextGenerationGateway {
    constructor(provider) {
      this.provider = provider;
    }

    generateStepSuggestion(context) {
      return this.provider.generateText({
        prompt: buildStepSuggestionPrompt(context),
        temperature: 0.35,
        maxTokens: 220
      });
    }
  }

  class OllamaProvider {
    constructor(config) {
      this.config = config;
    }

    async generateText(request) {
      const models = [this.config.model, ...this.config.fallbackModels];
      const errors = [];

      for (const model of models) {
        try {
          const text = await this.requestOllama(model, request);
          if (text) {
            return {
              text,
              model
            };
          }
          errors.push(`${model}: empty response`);
        } catch (error) {
          errors.push(`${model}: ${error.message}`);
        }
      }

      throw new Error(errors.join(" / "));
    }

    async requestOllama(model, request) {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), this.config.timeoutMs);

      try {
        const response = await fetch(`${this.config.baseUrl}/api/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model,
            prompt: request.prompt,
            stream: false,
            options: {
              temperature: request.temperature,
              num_predict: request.maxTokens
            }
          }),
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Ollama API error: ${response.status}`);
        }

        const payload = await response.json();
        return sanitizeGeneratedText(payload.response);
      } finally {
        window.clearTimeout(timeout);
      }
    }
  }

  class ExternalApiProvider {
    async generateText() {
      throw new Error("External API provider is not configured yet.");
    }
  }

  function createTextGenerator(config = LLM_CONFIG) {
    const providers = {
      ollama: () => new OllamaProvider(config),
      external: () => new ExternalApiProvider()
    };
    const createProvider = providers[config.provider] || providers.ollama;
    return new TextGenerationGateway(createProvider());
  }

  function buildStepSuggestionPrompt(context) {
    const companySummary = Object.entries(context.company)
      .filter(([, value]) => String(value || "").trim())
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    return `
あなたはAI Startup Studioの共同創業者です。
ユーザーは社長です。チャット口調ではなく、共同創業者からの短い提案として返してください。

条件:
- 必ず日本語で返す
- 80字から160字
- 断定しすぎず、次の意思決定がしやすい具体性を持たせる
- 箇条書き、Markdown、見出し、引用符は使わない
- 「AIとして」は書かない

現在のステップ:
${context.stepTitle}

ステップの目的:
${context.stepPrompt}

社長の入力:
${context.currentInput || "まだ入力はありません。"}

会社情報:
${companySummary || "まだ十分な会社情報はありません。"}

共同創業者からの提案:
`.trim();
  }

  function sanitizeGeneratedText(value) {
    return String(value || "")
      .replace(/^[\s"'「]+|[\s"'」]+$/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  window.AiStudioLLM = {
    config: LLM_CONFIG,
    createTextGenerator
  };
})();
