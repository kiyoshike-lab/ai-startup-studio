const STORAGE_KEYS = {
  current: "ai-startup-studio.current",
  vault: "ai-startup-studio.vault",
  company: "ai-startup-studio.company",
  startupIdea: "ai-startup-studio.startupIdea"
};

const SERVICE_URLS = {
  chanceVault: "https://chance-vault.vercel.app",
  startupStudio: "https://ai-startup-studio-xi.vercel.app",
  ceoOs: "https://ceo-os-eight-chi.vercel.app",
  aiJobHuntingCoach: "https://ai-job-hunting-coach-l85l.vercel.app"
};

const platformFlow = [
  {
    name: "Chance Vault",
    role: "ビジネスチャンスを見つける",
    description: "市場の変化、未充足の課題、最初に狙うべき機会を整理します。",
    href: SERVICE_URLS.chanceVault
  },
  {
    name: "AI Startup Studio",
    role: "会社を作る",
    description: "共同創業者と一緒に、アイデアを会社として成立する形へ進めます。",
    href: SERVICE_URLS.startupStudio
  },
  {
    name: "CEO OS",
    role: "会社を経営する",
    description: "設立後の意思決定、運営、成長の実行管理へ引き継ぎます。",
    href: SERVICE_URLS.ceoOs
  },
  {
    name: "AI Job Hunting Coach",
    role: "AI就活サポート",
    description: "自己分析、応募準備、面接対策までをAIと一緒に進めます。",
    href: SERVICE_URLS.aiJobHuntingCoach
  }
];

const steps = [
  {
    id: "idea",
    title: "アイデア",
    field: "purpose",
    prompt: "解決したい課題と、作りたい会社の方向性を一文で置きましょう。",
    suggestion: "最初は構想を広げすぎず、「誰の、どの負担を軽くする会社か」を一つに絞ると、次の検証が明確になります。"
  },
  {
    id: "market",
    title: "市場調査",
    field: "market",
    prompt: "市場の変化、伸びている理由、今始める意味を書いてください。",
    suggestion: "市場を見るときは、規模よりも変化の理由を優先しましょう。人手不足、業務の複雑化、AI導入の予算化が追い風になります。"
  },
  {
    id: "competition",
    title: "競合分析",
    field: "competition",
    prompt: "既存の代替手段、直接競合、勝てる違いを整理しましょう。",
    suggestion: "競合の有無だけで判断せず、顧客が今どんな代替手段で我慢しているかを見ます。そこに初期の勝ち筋があります。"
  },
  {
    id: "target",
    title: "ターゲット",
    field: "target",
    prompt: "最初に届ける顧客像をできるだけ具体的に書いてください。",
    suggestion: "最初の顧客は、課題が強く、導入後の変化を説明しやすい相手に絞りましょう。建設会社は有力な候補です。"
  },
  {
    id: "business-model",
    title: "ビジネスモデル",
    field: "businessModel",
    prompt: "誰から、何に対して、どの頻度でお金を受け取るかを決めましょう。",
    suggestion: "初期は導入判断を軽くする価格設計が向いています。月額モデルにし、成果が見えた後に上位プランを作る余地を残しましょう。"
  },
  {
    id: "mvp",
    title: "MVP設計",
    field: "mvp",
    prompt: "2週間で出せる最小機能と、検証したい仮説を書きましょう。",
    suggestion: "MVPは2週間で公開できる範囲に絞ります。機能数よりも、ひとつの業務フローが本当に楽になるかを確認しましょう。"
  },
  {
    id: "brand",
    title: "ブランド",
    field: "brand",
    prompt: "会社名、ブランドの印象、顧客に残したい言葉を決めましょう。",
    suggestion: "ブランドは派手さより信頼です。信頼、速さ、現場感の三つを軸にすると、初期顧客に伝わりやすくなります。"
  },
  {
    id: "lp",
    title: "LP",
    field: "landingPage",
    prompt: "LPの見出し、約束する価値、問い合わせまでの流れを書いてください。",
    suggestion: "LPでは説明を増やすより、課題、解決策、導入後の変化を一直線に見せることを優先しましょう。"
  },
  {
    id: "sns",
    title: "SNS",
    field: "social",
    prompt: "誰に向けて、どんな投稿を続けるかを決めましょう。",
    suggestion: "SNSはチャットの延長ではなく、顧客の課題を丁寧に言語化する場所です。専門性が残る投稿に寄せましょう。"
  },
  {
    id: "price",
    title: "価格",
    field: "price",
    prompt: "初期価格、無料トライアル、値上げのタイミングを置いてください。",
    suggestion: "価格は最初から複雑にしないで大丈夫です。小さく始め、効果が測れたらプランを分ける流れが自然です。"
  },
  {
    id: "sales",
    title: "初回営業",
    field: "sales",
    prompt: "最初の10社へどう声をかけるか、営業文と導線を書きましょう。",
    suggestion: "初回営業は完成品の売り込みではなく、課題ヒアリングの相談として始めると、相手の本音を集めやすくなります。"
  },
  {
    id: "incorporation",
    title: "会社設立",
    field: "description",
    prompt: "会社説明として、目的、顧客、提供価値をまとめてください。",
    suggestion: "ここまでの判断を一つの会社情報にまとめます。完成後は、AI Company OSへ引き継げる設計情報として保存されます。"
  }
];

const advisorSuggestions = [
  "市場判断は、規模よりも「なぜ今変化しているか」を軸に見ると精度が上がります。",
  "競合が少ない領域では、顧客の既存ワークフローに入り込めるかが勝負です。",
  "MVPは2週間で検証できる一機能に絞ると、学びの速度を落とさずに進められます。",
  "最初の顧客は、課題が深く、導入後の成果を一緒に測れる相手を選びましょう。"
];

const phaseGroups = [
  { title: "構想", start: 0, end: 2 },
  { title: "検証", start: 3, end: 5 },
  { title: "市場投入", start: 6, end: 9 },
  { title: "始動", start: 10, end: 11 }
];

const initialState = {
  view: "home",
  activeStep: 0,
  completedSteps: [],
  ideaInput: "",
  startupIdea: "",
  isStarting: false,
  generatedSuggestions: {},
  llm: {
    status: "idle",
    message: "",
    stepId: ""
  },
  company: {
    name: "",
    purpose: "",
    market: "",
    competition: "",
    target: "",
    businessModel: "",
    mvp: "",
    brand: "",
    landingPage: "",
    social: "",
    price: "",
    sales: "",
    description: ""
  },
  foundedCompany: null,
  vault: []
};

let state = loadState();
const app = document.querySelector("#app");
const textGenerator = window.AiStudioLLM?.createTextGenerator();

function loadState() {
  const current = readJson(STORAGE_KEYS.current, {});
  return {
    ...initialState,
    ...current,
    company: {
      ...initialState.company,
      ...(current.company || {})
    },
    generatedSuggestions: current.generatedSuggestions || {},
    llm: {
      ...initialState.llm,
      ...(current.llm || {})
    },
    startupIdea: current.startupIdea || localStorage.getItem(STORAGE_KEYS.startupIdea) || "",
    isStarting: false,
    vault: readJson(STORAGE_KEYS.vault, []),
    foundedCompany: readJson(STORAGE_KEYS.company, null)
  };
}

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveCurrent() {
  const { activeStep, completedSteps, generatedSuggestions, ideaInput, startupIdea, company, view } = state;
  localStorage.setItem(
    STORAGE_KEYS.current,
    JSON.stringify({ activeStep, completedSteps, generatedSuggestions, ideaInput, startupIdea, company, view })
  );
}

function updateState(nextState) {
  state = { ...state, ...nextState };
  saveCurrent();
  render();
}

function createCompanyName(input) {
  const trimmed = input.trim();
  if (!trimmed) {
    return "New Company";
  }

  return trimmed.length > 28 ? `${trimmed.slice(0, 28)} Studio` : `${trimmed} Studio`;
}

function startStudio(event) {
  event.preventDefault();
  const formElement = event.target.closest("[data-action='start']");
  const form = new FormData(formElement);
  const idea = String(form.get("idea") || "").trim() || "新しい会社を作る";
  const nextCompany = {
    ...initialState.company,
    name: createCompanyName(idea),
    purpose: idea
  };

  localStorage.setItem(STORAGE_KEYS.startupIdea, idea);

  updateState({
    view: "home",
    ideaInput: idea,
    startupIdea: idea,
    isStarting: true,
    generatedSuggestions: {},
    company: nextCompany
  });

  window.setTimeout(() => {
    updateState({
      view: "studio",
      activeStep: 0,
      completedSteps: [],
      isStarting: false,
      llm: {
        status: "idle",
        message: "",
        stepId: ""
      }
    });
    window.setTimeout(() => generateCurrentSuggestion(), 0);
  }, 450);
}

function updateCompanyField(field, value) {
  state = {
    ...state,
    company: {
      ...state.company,
      [field]: value
    }
  };
  saveCurrent();
}

function completeStep() {
  const currentStep = steps[state.activeStep];
  const completedSteps = Array.from(new Set([...state.completedSteps, currentStep.id]));

  if (state.activeStep === steps.length - 1) {
    foundCompany();
    return;
  }

  updateState({
    completedSteps,
    activeStep: Math.min(state.activeStep + 1, steps.length - 1)
  });
  window.setTimeout(() => generateCurrentSuggestion(), 0);
}

function foundCompany() {
  const completedSteps = Array.from(new Set([...state.completedSteps, steps.at(-1).id]));
  const companyForOs = {
    version: "startup-studio.local.v1",
    status: "ready_for_ai_company_os",
    createdAt: new Date().toISOString(),
    company: {
      name: state.company.name,
      purpose: state.company.purpose,
      target: state.company.target,
      businessModel: state.company.businessModel,
      brand: state.company.brand,
      price: state.company.price,
      description: state.company.description
    },
    studio: {
      completedSteps,
      source: "AI Startup Studio MVP",
      nextSystem: "AI Company OS"
    }
  };

  localStorage.setItem(STORAGE_KEYS.company, JSON.stringify(companyForOs));
  updateState({
    completedSteps,
    foundedCompany: companyForOs,
    view: "complete"
  });
}

function saveToVault() {
  const item = {
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
    activeStep: state.activeStep,
    completedSteps: state.completedSteps,
    ideaInput: state.ideaInput,
    company: state.company
  };
  const vault = [item, ...state.vault].slice(0, 12);

  localStorage.setItem(STORAGE_KEYS.vault, JSON.stringify(vault));
  updateState({ vault });
}

function restoreFromVault(id) {
  const item = state.vault.find((entry) => entry.id === id);
  if (!item) {
    return;
  }

  updateState({
    view: "studio",
    activeStep: item.activeStep,
    completedSteps: item.completedSteps,
    ideaInput: item.ideaInput,
    company: item.company
  });
  window.setTimeout(() => generateCurrentSuggestion(), 0);
}

async function generateCurrentSuggestion() {
  const currentStep = steps[state.activeStep];

  if (!textGenerator) {
    updateState({
      llm: {
        status: "error",
        message: "LLM接続層を読み込めませんでした。テンプレート提案を表示しています。",
        stepId: currentStep.id
      }
    });
    return;
  }

  updateState({
    llm: {
      status: "loading",
      message: "共同創業者が提案を作成しています。",
      stepId: currentStep.id
    }
  });

  try {
    const result = await textGenerator.generateStepSuggestion({
      stepTitle: currentStep.title,
      stepPrompt: currentStep.prompt,
      currentInput: state.company[currentStep.field] || "",
      company: state.company
    });
    const suggestion = result.text || result;
    const model = result.model || window.AiStudioLLM.config.model;

    updateState({
      generatedSuggestions: {
        ...state.generatedSuggestions,
        [currentStep.id]: suggestion || currentStep.suggestion
      },
      llm: {
        status: "ready",
        message: `Ollama ${model} で生成しました。`,
        stepId: currentStep.id
      }
    });
  } catch (error) {
    updateState({
      llm: {
        status: "error",
        message: `生成に失敗しました。テンプレート提案を表示しています。${error.message}`,
        stepId: currentStep.id
      }
    });
  }
}

function resetStudio() {
  localStorage.removeItem(STORAGE_KEYS.current);
  state = {
    ...initialState,
    vault: readJson(STORAGE_KEYS.vault, []),
    foundedCompany: readJson(STORAGE_KEYS.company, null)
  };
  render();
}

function renderHome() {
  return `
    <main class="home-shell">
      <section class="home-panel" aria-labelledby="home-title">
        <p class="kicker">AI Startup Studio</p>
        <h1 id="home-title">共同創業者：ChatGPT</h1>
        <form class="idea-form" data-action="start">
          <label class="visually-hidden" for="idea">今日はどんな会社を作りましょう？</label>
          <input id="idea" name="idea" value="${escapeHtml(state.ideaInput)}" placeholder="今日はどんな会社を作りましょう？" autocomplete="off" />
          <button type="submit" ${state.isStarting ? "disabled" : ""}>${state.isStarting ? "開始中" : "始める"}</button>
        </form>
        ${state.isStarting ? `<p class="starting-message">共同創業を開始しています…</p>` : ""}
        ${state.vault.length ? `<button class="text-button" data-view="vault" type="button">Vaultから続きを開く</button>` : ""}
      </section>
      <section class="platform-section" aria-labelledby="platform-title">
        <p class="kicker">AI Company Platform</p>
        <h2 id="platform-title">勝ち筋から、立ち上げ、経営へ。</h2>
        <div class="platform-flow">
          ${platformFlow.map((service, index) => renderPlatformItem(service, index)).join("")}
        </div>
      </section>
    </main>
  `;
}

function renderPlatformItem(service, index) {
  const isCurrent = service.name === "AI Startup Studio";

  return `
    <article class="platform-item ${isCurrent ? "current" : ""}">
      <a class="platform-card-link" href="${service.href}" target="_blank" rel="noopener noreferrer" aria-label="${service.name}を開く"></a>
      <div class="platform-card-head">
        <span>${String(index + 1).padStart(2, "0")}</span>
        ${isCurrent ? `<em>Now</em>` : ""}
      </div>
      <strong>${service.name}</strong>
      <p class="platform-role">${service.role}</p>
      <p class="platform-description">${service.description}</p>
      <a class="platform-button" href="${service.href}" target="_blank" rel="noopener noreferrer">開く</a>
    </article>
  `;
}

function renderStudio() {
  const currentStep = steps[state.activeStep];
  const value = state.company[currentStep.field] || "";
  const progress = Math.round(((state.activeStep + 1) / steps.length) * 100);
  const dynamicSuggestion = state.generatedSuggestions[currentStep.id] || currentStep.suggestion;
  const isGenerating = state.llm.status === "loading" && state.llm.stepId === currentStep.id;
  const llmMessage = state.llm.stepId === currentStep.id ? state.llm.message : "";

  return `
    <main class="studio-shell">
      <aside class="steps-pane" aria-label="会社を作る工程">
        <div class="pane-heading">
          <span>AI Startup Studio</span>
          <button class="icon-button" data-action="home" type="button" aria-label="トップへ戻る">←</button>
        </div>
        <div class="progress-summary">
          <span>現在の工程</span>
          <strong>${state.activeStep + 1}. ${currentStep.title}</strong>
          <div class="progress-track" aria-hidden="true"><span style="width: ${progress}%"></span></div>
        </div>
        ${renderStepGroups()}
      </aside>

      <section class="workspace" aria-labelledby="step-title">
        <div class="workspace-bar">
          <span>Step ${state.activeStep + 1} of ${steps.length}</span>
          <div class="bar-actions">
            <button class="secondary-button" data-action="vault" type="button">Vaultへ保存</button>
            <button class="secondary-button" data-view="vault" type="button">Vault</button>
          </div>
        </div>

        <div class="step-content">
          <p class="kicker">共同創業者と作る会社 · ${getPhaseTitle(state.activeStep)}</p>
          <h1 id="step-title">${currentStep.title}</h1>
          <p class="step-prompt">${currentStep.prompt}</p>

          <div class="ai-proposal">
            <div class="proposal-head">
              <span>共同創業者の視点</span>
              <button class="secondary-button compact-button" data-action="generate-suggestion" type="button" ${isGenerating ? "disabled" : ""}>
                ${state.generatedSuggestions[currentStep.id] ? "再生成" : "生成する"}
              </button>
            </div>
            <p>${escapeHtml(isGenerating ? "入力内容を読み取り、次の意思決定につながる提案を作成しています。" : dynamicSuggestion)}</p>
            ${llmMessage ? `<small class="llm-status ${state.llm.status}">${escapeHtml(llmMessage)}</small>` : ""}
          </div>

          <label class="input-label" for="company-name">会社名</label>
          <input id="company-name" class="line-input" value="${escapeHtml(state.company.name)}" data-field="name" placeholder="会社名を入力" />

          <label class="input-label" for="president-input">社長の入力</label>
          <textarea id="president-input" data-field="${currentStep.field}" placeholder="ここに考えを書いてください">${escapeHtml(value)}</textarea>

          <button class="primary-button" data-action="complete" type="button">
            ${state.activeStep === steps.length - 1 ? "会社を設立する" : "完了して次へ"}
          </button>
        </div>
      </section>

      <aside class="advisor-pane" aria-labelledby="advisor-title">
        <h2 id="advisor-title">共同創業者からの提案</h2>
        <p class="advisor-note">判断を急がず、検証しやすい順番に並べています。</p>
        <div class="suggestions">
          ${advisorSuggestions.map((suggestion) => `<p>${suggestion}</p>`).join("")}
        </div>
      </aside>
    </main>
  `;
}

function renderStepGroups() {
  return phaseGroups
    .map((group) => {
      const groupSteps = steps.slice(group.start, group.end + 1);
      return `
        <section class="step-group" aria-label="${group.title}">
          <h2>${group.title}</h2>
          <ol class="steps-list">
            ${groupSteps.map((step, offset) => renderStepItem(step, group.start + offset)).join("")}
          </ol>
        </section>
      `;
    })
    .join("");
}

function getPhaseTitle(index) {
  const phase = phaseGroups.find((group) => index >= group.start && index <= group.end);
  return phase ? phase.title : "構想";
}

function renderStepItem(step, index) {
  const isActive = index === state.activeStep;
  const isDone = state.completedSteps.includes(step.id);
  const className = ["step-item", isActive ? "active" : "", isDone ? "done" : ""].filter(Boolean).join(" ");

  return `
    <li>
      <button class="${className}" data-step="${index}" type="button">
        <span>${index + 1}</span>
        <strong>${step.title}</strong>
      </button>
    </li>
  `;
}

function renderVault() {
  return `
    <main class="vault-shell">
      <nav class="simple-nav">
        <button class="icon-button" data-action="back-to-studio" type="button" aria-label="戻る">←</button>
        <span>Vault</span>
      </nav>
      <section class="vault-list" aria-label="保存した会社">
        ${
          state.vault.length
            ? state.vault.map((item) => renderVaultItem(item)).join("")
            : `<p class="empty-state">まだ保存された会社はありません。</p>`
        }
      </section>
    </main>
  `;
}

function renderVaultItem(item) {
  const savedAt = new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(item.savedAt));

  return `
    <article class="vault-item">
      <div>
        <h2>${escapeHtml(item.company.name || "名称未設定の会社")}</h2>
        <p>${escapeHtml(item.company.purpose || item.ideaInput || "アイデアを編集中")}</p>
        <small>${savedAt} · ${item.activeStep + 1} / ${steps.length}</small>
      </div>
      <button class="secondary-button" data-restore="${item.id}" type="button">続きを編集</button>
    </article>
  `;
}

function renderComplete() {
  const company = state.foundedCompany?.company || state.company;

  return `
    <main class="complete-shell">
      <section class="complete-panel">
        <p class="kicker">Congratulations!</p>
        <h1>会社の輪郭が、立ち上がりました。</h1>
        <p class="complete-lead">アイデアは、顧客、価値、価格、最初の営業までつながりました。${escapeHtml(company.name || "新しい会社")} は、次に経営へ進むための会社情報としてローカル保存されています。</p>
        <p class="handoff-badge">Ready for AI Company OS</p>
        <dl class="handoff-list">
          <div><dt>会社の目的</dt><dd>${escapeHtml(company.purpose || "未入力")}</dd></div>
          <div><dt>ターゲット</dt><dd>${escapeHtml(company.target || "未入力")}</dd></div>
          <div><dt>ビジネスモデル</dt><dd>${escapeHtml(company.businessModel || "未入力")}</dd></div>
          <div><dt>ブランド</dt><dd>${escapeHtml(company.brand || "未入力")}</dd></div>
          <div><dt>価格</dt><dd>${escapeHtml(company.price || "未入力")}</dd></div>
          <div><dt>会社説明</dt><dd>${escapeHtml(company.description || "未入力")}</dd></div>
        </dl>
        <div class="complete-actions">
          <a class="primary-button cta-link" href="${SERVICE_URLS.ceoOs}" target="_blank" rel="noopener noreferrer">CEO OSで経営を始める</a>
          <button class="primary-button" data-action="restart" type="button">新しい会社を作る</button>
          <button class="secondary-button" data-view="vault" type="button">Vaultを見る</button>
        </div>
      </section>
    </main>
  `;
}

function render() {
  const views = {
    home: renderHome,
    studio: renderStudio,
    vault: renderVault,
    complete: renderComplete
  };

  app.innerHTML = views[state.view]();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-action='start']");
  if (form) {
    startStudio(event);
  }
});

document.addEventListener("input", (event) => {
  const field = event.target.dataset.field;
  if (field) {
    updateCompanyField(field, event.target.value);
  }
});

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) {
    return;
  }

  if (target.dataset.step) {
    updateState({ activeStep: Number(target.dataset.step), view: "studio" });
  }

  if (target.dataset.view) {
    updateState({ view: target.dataset.view });
  }

  if (target.dataset.restore) {
    restoreFromVault(target.dataset.restore);
  }

  const actions = {
    complete: completeStep,
    "generate-suggestion": generateCurrentSuggestion,
    vault: saveToVault,
    home: () => updateState({ view: "home" }),
    "back-to-studio": () => updateState({ view: state.company.name ? "studio" : "home" }),
    restart: resetStudio
  };

  const action = actions[target.dataset.action];
  if (action) {
    action();
  }
});

render();
