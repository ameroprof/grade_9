(() => {
  "use strict";

  const STORAGE_KEY = "digitalGuardians.studentRecords.v1";
  const ROUND_SECONDS = 30;
  const questions = [
    {
      topic: "محقّق الجرائم الرقمية",
      label: "فخّ التصيّد",
      badge: "رسالة مشبوهة",
      tip: "الرابط اللي بوعدك بجائزة وبيطلب كلمة المرور؟ علامة خطر، مش فرصة!",
      question: "وصلتك رسالة: «ربحت جهاز ألعاب! افتح الرابط واكتب كلمة مرورك». شو أذكى حركة؟",
      choices: [
        "أفتح الرابط بسرعة قبل ما تروح الجائزة",
        "أبعث كلمة المرور عشان أتأكّد من هويتي",
        "ما أضغط الرابط، وأتحقّق من الموقع الرسمي وأبلّغ عن الرسالة",
        "أبعث الرسالة لكل أصحاب الصف"
      ],
      correct: 2,
      explanation: "التصيّد بخدعك برسالة أو رابط حتى تسرق معلوماتك. لا تفتح الرابط ولا تعطي بياناتك؛ تحقّق من المصدر الرسمي وبلّغ."
    },
    {
      topic: "محقّق الجرائم الرقمية",
      label: "اختراق الحسابات",
      badge: "حساب غير إلك",
      tip: "تذكّر: الدخول لحساب غيرك بدون إذن تعدّي، حتى لو كان صاحبك!",
      question: "زميلك ترك حسابه مفتوح، وصاحبك بحكيلك: «افتحه، بس بدنا نمزح». شو بتعمل؟",
      choices: [
        "بدخل دقيقة، ما رح يعرف",
        "بغيّر صورة الحساب وبضحك معه",
        "بسجّل خروج وبحكيله يسجّل دخوله، وما بفتح حسابه",
        "بصوّر الشاشة وبنشرها"
      ],
      correct: 2,
      explanation: "الدخول لحساب شخص بدون إذنه اختراق وانتهاك للخصوصية، حتى لو كان القصد مزح. اترك الحساب آمنًا ونبّه صاحبه."
    },
    {
      topic: "محقّق الجرائم الرقمية",
      label: "ملفّ خطير",
      badge: "مرفق مجهول",
      tip: "التحديثات ومكافحة الفيروسات بتساعد تمنع البرامج الخبيثة من إيذاء جهازك.",
      question: "وصلك ملف لعبة من شخص ما بتعرفه، وجهازك حذّرك إنه ممكن يكون ضار. شو الخطة؟",
      choices: [
        "أفتحه وأشوف شو بصير",
        "أرسله لمجموعة الصف حتى يجربوه",
        "أحذفه، وأحدّث برنامج الحماية، وأفحص الجهاز",
        "أعطّل التحذير عشان يفتح"
      ],
      correct: 2,
      explanation: "البرمجيات الخبيثة ممكن تخرب الملفات أو تسرق المعلومات. لا تفتح الملف، واستخدم برنامج حماية محدّثًا."
    },
    {
      topic: "محقّق الجرائم الرقمية",
      label: "قفل الحساب",
      badge: "درع كلمة المرور",
      tip: "كلمة مرور قوية ومختلفة لكل حساب، ومعها التحقّق بخطوتين، بتصعّب سرقة الحساب.",
      question: "بدك تحمي حسابك من السرقة. أي خيار أقوى؟",
      choices: [
        "أستخدم تاريخ ميلادي لكل الحسابات",
        "أختار كلمة مرور قوية ومختلفة، وما أشاركها، وبفعّل التحقّق بخطوتين",
        "أكتب كلمة مروري على ورقة جنب الجهاز",
        "أبعث كلمة المرور لصاحبي عشان يتذكّرها"
      ],
      correct: 1,
      explanation: "كلمة المرور القوية والفريدة، مع عدم مشاركتها وتفعيل التحقّق بخطوتين، بتضيف طبقة أمان مهمة."
    },
    {
      topic: "كاسر التنمّر الإلكتروني",
      label: "ممرّ المحادثة",
      badge: "كلمة بتجرح",
      tip: "التنمّر ممكن يصير بالتعليقات أو الرسائل أو الألعاب، والكلمة الطيبة بتحمي.",
      question: "بغرفة اللعبة، لاعب بكرّر تعليقات جارحة على زميلك وبهينه قدّام الكل. شو اسم هالتصرّف؟",
      choices: [
        "منافسة عادية وما إلها أثر",
        "تنمّر إلكتروني؛ لأنه سلوك عدواني مؤذٍ عبر منصة رقمية",
        "مزحة لازم الضحية تتحمّلها",
        "مشكلة بالإنترنت"
      ],
      correct: 1,
      explanation: "التنمّر الإلكتروني سلوك عدواني بقصد الأذى أو الإهانة عبر الألعاب أو الرسائل أو منصات التواصل."
    },
    {
      topic: "كاسر التنمّر الإلكتروني",
      label: "إنقاذ زميل",
      badge: "بلاغ آمن",
      tip: "لا تردّ على المتنمّر: احفظ الدليل، احظره، بلّغ، واحكي مع شخص كبير بتثق فيه.",
      question: "زميلك فرجاك رسالة تهديد على لعبة. شو أحسن ترتيب للتصرّف؟",
      choices: [
        "أردّ على المتنمّر بتهديد أقوى",
        "أحفظ الرسالة كدليل، أحظر الحساب وأبلّغ، وبحكي مع شخص موثوق",
        "أحذف الرسالة وبسكت وما بخبر حدا",
        "أنشر اسم المتنمّر وصورته للكل"
      ],
      correct: 1,
      explanation: "لا تتفاعل مع المتنمّر. احتفظ بالرسائل والأدلة، احظره وأبلغ المنصة، واطلب مساعدة الأهل أو المدرسة."
    },
    {
      topic: "كاسر التنمّر الإلكتروني",
      label: "درع الخصوصية",
      badge: "قبل ما تنشر",
      tip: "فكّر قبل النشر: معلوماتك وصور الناس خصوصية، واللي بننشر ممكن يضل على الإنترنت.",
      question: "صاحبك بده ينشر صورة محرجة لطالب من الصف بدون موافقته. شو بتعمل؟",
      choices: [
        "بساعده يضيف تعليق أضحك",
        "بوقفه، وبحكيله ما ينشرها ويحذفها لأنها بتأذي وبتنتهك الخصوصية",
        "بنشرها بحساب ثاني",
        "ببعثها لمجموعة صغيرة بس"
      ],
      correct: 1,
      explanation: "نشر صورة مهينة أو خاصة بدون موافقة ممكن يسبّب أذى ويصير تنمّرًا إلكترونيًا. وقف النشر واحترم الخصوصية."
    },
    {
      topic: "كاسر التنمّر الإلكتروني",
      label: "الفريق الساند",
      badge: "مساندة رقمية",
      tip: "ساند اللي بتعرّض للتنمّر: اسمعله، لا تلومه، وشجّعه يطلب المساعدة.",
      question: "بحسب اللي تعلّمته، شو ممكن يساهم بظهور التنمّر الإلكتروني؟",
      choices: [
        "الغضب أو ضغط الأقران أو الرغبة بالسيطرة، بس هاي أسباب ما بتبرّر الأذى",
        "سرعة الإنترنت وقوة الجهاز",
        "حفظ كلمات المرور بأمان",
        "التبليغ عن رسالة مؤذية"
      ],
      correct: 0,
      explanation: "الغضب وضغط الأقران والرغبة بالسيطرة عوامل ممكن تسهم بالتنمّر، لكنها ما بتبرّر الإساءة. ارفض الأذى وساند المتضرر."
    }
  ];

  const $ = (selector) => document.querySelector(selector);
  const screens = [...document.querySelectorAll(".screen")];
  const arabicDigits = new Intl.NumberFormat("ar-JO");
  let records = loadRecords();
  let currentRecord = null;
  let roundIndex = 0;
  let correctCount = 0;
  let cyberCorrect = 0;
  let bullyingCorrect = 0;
  let points = 0;
  let secondsLeft = ROUND_SECONDS;
  let timerId = null;
  let roundAnswered = false;
  let displayedQuestion = null;

  function toArabic(number) {
    return arabicDigits.format(number);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function showNotice(message) {
    const notice = $("#app-notice");
    notice.textContent = message;
    notice.hidden = false;
  }

  function hideNotice() {
    $("#app-notice").hidden = true;
  }

  function loadRecords() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) throw new TypeError("سجلّ التقييمات المحفوظ مش بصيغته الصحيحة.");
      return parsed.filter((record) => record && typeof record.id === "string" && typeof record.name === "string");
    } catch (error) {
      const detail = error instanceof SyntaxError || error instanceof TypeError
        ? error.message
        : "المتصفّح ما قدر يقرأ التخزين المحلي.";
      showNotice(`تعذّر تحميل سجلّ الطلاب المحفوظ: ${detail} جرّب تفتح اللعبة في متصفّح عادي وتتأكد من إعدادات التخزين.`);
      return [];
    }
  }

  function saveRecords(updated) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      records = updated;
      return true;
    } catch (error) {
      const detail = error instanceof DOMException && error.name === "QuotaExceededError"
        ? "مساحة التخزين المحلي ممتلئة."
        : "المتصفّح منع الحفظ المحلي.";
      showNotice(`${detail} النتيجة الحالية ظاهرة، بس ما رح تنحفظ على الجهاز. فرّغ مساحة أو اسمح بالتخزين المحلي.`);
      return false;
    }
  }

  function persistCurrentRecord() {
    if (!currentRecord) return false;
    const index = records.findIndex((record) => record.id === currentRecord.id);
    const updated = [...records];
    if (index < 0) updated.unshift(currentRecord);
    else updated[index] = currentRecord;
    return saveRecords(updated);
  }

  function renderShields(mistakes) {
    const remaining = Math.max(0, 3 - mistakes);
    $("#shield-value").textContent = Array.from(
      { length: 3 },
      (_, index) => index < remaining ? "🛡️" : "♡"
    ).join(" ");
    $("#shield-fill").style.width = `${(remaining / 3) * 100}%`;
  }

  function showScreen(id) {
    window.clearInterval(timerId);
    timerId = null;
    screens.forEach((screen) => {
      const isActive = screen.id === id;
      screen.classList.toggle("active", isActive);
      screen.setAttribute("aria-hidden", String(!isActive));
    });
    $("#app").focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    hideNotice();
    currentRecord = null;
    $("#start-form").reset();
    $("#form-error").textContent = "";
    showScreen("home-screen");
    $("#student-name").focus({ preventScroll: true });
  }

  function startGame(event) {
    event.preventDefault();
    hideNotice();
    const nameInput = $("#student-name");
    const classInput = $("#student-class");
    const name = nameInput.value.trim().replace(/\s+/g, " ");
    const studentClass = classInput.value.trim().replace(/\s+/g, " ");
    if (!name || !studentClass) {
      $("#form-error").textContent = "اكتب اسمك وشعبتك قبل ما تدخل المهمّة.";
      return;
    }
    $("#form-error").textContent = "";
    currentRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name,
      studentClass,
      startedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
      answered: 0,
      correct: 0,
      cyberCorrect: 0,
      bullyingCorrect: 0,
      points: 0,
      percent: 0,
      status: "in-progress"
    };
    roundIndex = 0;
    correctCount = 0;
    cyberCorrect = 0;
    bullyingCorrect = 0;
    points = 0;
    persistCurrentRecord();
    $("#player-display").textContent = name;
    showScreen("game-screen");
    renderRound();
  }

  function renderRound() {
    if (roundIndex >= questions.length) {
      finishGame();
      return;
    }
    const sourceQuestion = questions[roundIndex];
    const shuffledChoices = sourceQuestion.choices.map((text, index) => ({ text, index }));
    for (let index = shuffledChoices.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffledChoices[index], shuffledChoices[swapIndex]] = [shuffledChoices[swapIndex], shuffledChoices[index]];
    }
    displayedQuestion = {
      ...sourceQuestion,
      choices: shuffledChoices.map((choice) => choice.text),
      correct: shuffledChoices.findIndex((choice) => choice.index === sourceQuestion.correct)
    };
    const question = displayedQuestion;
    roundAnswered = false;
    secondsLeft = ROUND_SECONDS;
    $("#mission-label").textContent = roundIndex < 4 ? "المنطقة الأولى · درع البيانات" : "المنطقة الثانية · مساحة آمنة";
    $("#topic-badge").textContent = question.topic;
    $("#scene-alert").textContent = question.badge;
    $("#scene-target").textContent = roundIndex < 4 ? "✧" : "♡";
    $("#question-text").textContent = question.question;
    $("#safety-tip-text").textContent = question.tip;
    $("#round-value").textContent = `${toArabic(roundIndex + 1)} / ${toArabic(questions.length)}`;
    $("#round-progress-fill").style.width = `${(roundIndex / questions.length) * 100}%`;
    $("#score-value").textContent = toArabic(points);
    renderShields(roundIndex - correctCount);
    $("#feedback-panel").hidden = true;
    $("#feedback-panel").classList.remove("is-wrong");
    $("#next-button").hidden = true;
    const list = $("#options-list");
    list.replaceChildren();
    question.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      button.dataset.choice = String(index);
      button.setAttribute("aria-label", `الخيار ${toArabic(index + 1)}: ${choice}`);
      const number = document.createElement("span");
      number.className = "option-number";
      number.setAttribute("aria-hidden", "true");
      number.textContent = toArabic(index + 1);
      const text = document.createElement("span");
      text.className = "option-text";
      text.textContent = choice;
      button.append(number, text);
      button.addEventListener("click", () => answerQuestion(index));
      list.append(button);
    });
    updateTimerDisplay();
    window.clearInterval(timerId);
    timerId = window.setInterval(() => {
      secondsLeft -= 1;
      updateTimerDisplay();
      if (secondsLeft <= 0) {
        window.clearInterval(timerId);
        timerId = null;
        answerQuestion(-1);
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    $("#timer-value").textContent = toArabic(secondsLeft);
    const timerFill = $("#timer-fill");
    timerFill.style.width = `${(secondsLeft / ROUND_SECONDS) * 100}%`;
    timerFill.classList.toggle("timer-warning", secondsLeft <= 8);
  }

  function answerQuestion(selected) {
    if (roundAnswered) return;
    roundAnswered = true;
    window.clearInterval(timerId);
    timerId = null;
    const question = displayedQuestion;
    const isCorrect = selected === question.correct;
    const buttons = [...$("#options-list").querySelectorAll(".answer-option")];
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === question.correct) button.classList.add("is-correct");
      if (index === selected && !isCorrect) button.classList.add("is-wrong");
    });

    const feedback = $("#feedback-panel");
    feedback.hidden = false;
    feedback.classList.toggle("is-wrong", !isCorrect);
    const heading = document.createElement("strong");
    heading.textContent = selected < 0 ? "خلص الوقت!" : isCorrect ? "إجابة صح! شحنة الدرع +١" : "مش هاي الحركة الصح.";
    const detail = document.createElement("span");
    detail.textContent = question.explanation;
    feedback.replaceChildren(heading, detail);

    if (isCorrect) {
      correctCount += 1;
      if (roundIndex < 4) cyberCorrect += 1;
      else bullyingCorrect += 1;
      points += 100 + Math.floor(secondsLeft / 3) * 5;
    }
    currentRecord.answered += 1;
    currentRecord.correct = correctCount;
    currentRecord.cyberCorrect = cyberCorrect;
    currentRecord.bullyingCorrect = bullyingCorrect;
    currentRecord.points = points;
    currentRecord.percent = Math.round((correctCount / questions.length) * 100);
    currentRecord.updatedAt = new Date().toISOString();
    persistCurrentRecord();

    $("#score-value").textContent = toArabic(points);
    renderShields(roundIndex + 1 - correctCount);
    $("#round-progress-fill").style.width = `${((roundIndex + 1) / questions.length) * 100}%`;
    $("#next-button").textContent = roundIndex === questions.length - 1 ? "اعرف نتيجتك ←" : "التحدّي اللي بعده ←";
    $("#next-button").hidden = false;
    $("#next-button").focus({ preventScroll: true });
  }

  function evaluationFor(percent) {
    if (percent >= 88) return {
      level: "بطل الفضاء الرقمي · متقن",
      medal: "🏆",
      advice: "فهمك ممتاز! إنت بتميّز التصيّد والاختراق، وبتعرف كيف تحمي الحساب وتوقف التنمّر. ضلّك قدوة رقمية وساعد غيرك."
    };
    if (percent >= 70) return {
      level: "درع الحماية · جيّد جدًا",
      medal: "🥇",
      advice: "أداؤك قوي! راجع الخطوات اللي فاتتك: لا تضغط الروابط المشبوهة، واحفظ الدليل وبلّغ شخصًا موثوقًا عند التنمّر."
    };
    if (percent >= 50) return {
      level: "حارس واعد · بحاجة لمراجعة",
      medal: "🛡️",
      advice: "بدايتك منيحة. راجع حماية كلمة المرور والتعامل مع رسائل التهديد، وبتركّز بالمهمّة الجاي بتصير أقوى."
    };
    return {
      level: "مستكشف جديد · جرّب كمان",
      medal: "🚀",
      advice: "كل بطل بتعلّم بالتدريب! راجع كيف تتعرّف على التصيّد والبرمجيات الخبيثة، وكيف توثّق التنمّر وتطلب المساعدة."
    };
  }

  function finishGame() {
    window.clearInterval(timerId);
    timerId = null;
    currentRecord.status = "completed";
    currentRecord.completedAt = new Date().toISOString();
    currentRecord.updatedAt = currentRecord.completedAt;
    persistCurrentRecord();
    const result = evaluationFor(currentRecord.percent);
    $("#result-name").textContent = currentRecord.name;
    $("#result-class").textContent = currentRecord.studentClass;
    $("#result-medal").textContent = result.medal;
    $("#result-subtitle").textContent = result.level;
    $("#final-score").textContent = `${toArabic(currentRecord.percent)}٪`;
    $("#correct-count").textContent = `${toArabic(correctCount)} من ${toArabic(questions.length)}`;
    $("#final-points").textContent = toArabic(points);
    const cyberPercent = Math.round((cyberCorrect / 4) * 100);
    const bullyingPercent = Math.round((bullyingCorrect / 4) * 100);
    const feedback = $("#learning-feedback");
    const title = document.createElement("strong");
    title.textContent = "تقييم فهمك:";
    const detail = document.createElement("span");
    detail.textContent = ` ${result.advice} الجرائم الإلكترونية: ${toArabic(cyberPercent)}٪ (${toArabic(cyberCorrect)} من ٤) · التنمّر الإلكتروني: ${toArabic(bullyingPercent)}٪ (${toArabic(bullyingCorrect)} من ٤).`;
    feedback.replaceChildren(title, detail);
    showScreen("results-screen");
  }

  function formatDate(dateString) {
    if (!dateString) return "—";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat("ar-JO", { dateStyle: "medium", timeStyle: "short" }).format(date);
  }

  function renderRecords() {
    const sorted = [...records].sort((left, right) => new Date(right.startedAt) - new Date(left.startedAt));
    const completed = sorted.filter((record) => record.status === "completed");
    const average = completed.length
      ? Math.round(completed.reduce((total, record) => total + Number(record.percent || 0), 0) / completed.length)
      : 0;
    $("#records-summary").innerHTML = [
      `<div class="summary-tile"><span>الطلاب اللي دخلوا المهمّة</span><strong>${toArabic(sorted.length)}</strong></div>`,
      `<div class="summary-tile"><span>المهمّات المكتملة</span><strong>${toArabic(completed.length)}</strong></div>`,
      `<div class="summary-tile"><span>متوسط تقييم الفهم</span><strong>${toArabic(average)}٪</strong></div>`
    ].join("");
    $("#empty-records").hidden = sorted.length > 0;
    const tbody = $("#records-body");
    tbody.replaceChildren();
    sorted.forEach((record) => {
      const row = document.createElement("tr");
      const status = record.status === "completed" ? "مكتملة" : "قيد اللعب";
      const score = Math.round(Number(record.percent) || 0);
      const answered = Math.min(Number(record.answered) || 0, questions.length);
      const correct = Math.min(Number(record.correct) || 0, questions.length);
      const cyberCorrectForRecord = Math.min(Number(record.cyberCorrect) || 0, 4);
      const bullyingCorrectForRecord = Math.min(Number(record.bullyingCorrect) || 0, 4);
      const studentCell = `<strong>${escapeHtml(record.name)}</strong><small>الشعبة ${escapeHtml(record.studentClass)}</small>`;
      row.innerHTML = `
        <td class="student-cell">${studentCell}</td>
        <td class="record-score">${toArabic(score)}٪</td>
        <td>${toArabic(cyberCorrectForRecord)} من ٤</td>
        <td>${toArabic(bullyingCorrectForRecord)} من ٤</td>
        <td>${toArabic(correct)} من ${toArabic(questions.length)} <small>(${toArabic(answered)} تحدّي)</small></td>
        <td><span class="status-pill ${record.status === "completed" ? "is-done" : ""}">${status}</span></td>
        <td>${formatDate(record.completedAt || record.startedAt)}</td>
        <td><button class="record-certificate" type="button" data-certificate-id="${escapeHtml(record.id)}" ${record.status !== "completed" ? "disabled" : ""}>${record.status === "completed" ? "عرض / طباعة" : "بعد الإكمال"}</button></td>`;
      tbody.append(row);
    });
  }

  function certificateMarkup(record) {
    const result = evaluationFor(Math.round(Number(record.percent) || 0));
    const correct = Math.min(Number(record.correct) || 0, questions.length);
    const cyberCorrectForRecord = Math.min(Number(record.cyberCorrect) || 0, 4);
    const bullyingCorrectForRecord = Math.min(Number(record.bullyingCorrect) || 0, 4);
    return `<article class="certificate-sheet" dir="rtl">
      <div class="certificate-emblem" aria-hidden="true">✦</div>
      <p class="certificate-kicker">حُماة الفضاء الرقمي · الصف التاسع</p>
      <h2>شهادة إنجاز وتقييم</h2>
      <div class="certificate-rule"></div>
      <p class="certificate-recipient">تُمنح بكل فخر للطالب / الطالبة</p>
      <p class="certificate-name">${escapeHtml(record.name)}</p>
      <p class="certificate-copy">لإتمام مهمّة الوعي والحماية من الجرائم الإلكترونية والتنمر الإلكتروني</p>
      <div class="certificate-score"><strong>${toArabic(Math.round(Number(record.percent) || 0))}٪</strong><span>تقييم فهم الطالب</span></div>
      <div class="certificate-details"><span>الشعبة: ${escapeHtml(record.studentClass)}</span><span>الإجابات الصحيحة: ${toArabic(correct)} من ${toArabic(questions.length)}</span><span>الجريمة الإلكترونية: ${toArabic(cyberCorrectForRecord)} من ٤</span><span>التنمّر الإلكتروني: ${toArabic(bullyingCorrectForRecord)} من ٤</span><span>نقاط المهمّة: ${toArabic(Number(record.points) || 0)}</span><span>التقدير: ${escapeHtml(result.level)}</span><span>التاريخ: ${escapeHtml(formatDate(record.completedAt || record.startedAt))}</span></div>
      <p class="certificate-note">${escapeHtml(result.advice)}</p>
      <div class="certificate-footer"><span>إعداد وتصميم المعلم: عامر كراجه<br>مدرسة ذكور وادي السير الإعدادية — الأنروا</span><span>المصدر: كتاب المهارات الرقمية للصف التاسع، الصفحات ٣٢–٤٥</span></div>
    </article>`;
  }

  function showCertificate(record) {
    $("#certificate-preview").innerHTML = certificateMarkup(record);
    showScreen("certificate-screen");
  }

  function nextRound() {
    if (!roundAnswered) return;
    roundIndex += 1;
    renderRound();
  }

  $("#start-form").addEventListener("submit", startGame);
  $("#next-button").addEventListener("click", nextRound);
  $("#print-certificate").addEventListener("click", () => {
    if (currentRecord) showCertificate(currentRecord);
  });
  $("#certificate-print-button").addEventListener("click", () => {
    document.body.classList.add("printing-certificate");
    window.print();
  });
  window.addEventListener("afterprint", () => document.body.classList.remove("printing-certificate"));

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (action?.dataset.action === "home") goHome();
    if (action?.dataset.action === "show-records") {
      hideNotice();
      renderRecords();
      showScreen("records-screen");
    }
    const certificateButton = event.target.closest("[data-certificate-id]");
    if (certificateButton && !certificateButton.disabled) {
      const record = records.find((item) => item.id === certificateButton.dataset.certificateId);
      if (record) showCertificate(record);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!$("#game-screen").classList.contains("active")) return;
    if (/^[1-4١-٤]$/.test(event.key) && !roundAnswered) {
      const digit = event.key.replace(/[١-٤]/g, (value) => String("١٢٣٤".indexOf(value) + 1));
      answerQuestion(Number(digit) - 1);
    } else if (event.key === "Enter" && roundAnswered && !$("#next-button").hidden) {
      nextRound();
    }
  });
})();