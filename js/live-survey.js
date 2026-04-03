// ===== Live Survey Validation =====
const API_URL = "https://optimizers-haris.onrender.com/validate";
const DEBOUNCE_MS = 1500;

let debounceTimer = null;

const fieldMap = {
  age: "age",
  education: "education",
  gender: "gender",
  maritalStatus: "marital_status",
  jobTitle: "job_title",
  experience: "experience",
  salary: "salary",
  nationality: "nationality",
  nationalId: "national_id",
  usualHours: "usual_hours",
};
const fields = Object.keys(fieldMap);

const latencyEl = document.getElementById("latencyValue");
const riskEl = document.getElementById("riskValue");
const alertBox = document.getElementById("alertBox");
const alertIcon = document.getElementById("alertIcon");
const alertText = document.getElementById("alertText");
const detailsSection = document.getElementById("detailsSection");
const issuesList = document.getElementById("issuesList");

// Attach listeners
fields.forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const event = el.tagName === "SELECT" ? "change" : "input";
  el.addEventListener(event, () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(sendValidation, DEBOUNCE_MS);
  });
});

async function sendValidation() {
  const payload = {};
  fields.forEach((id) => {
    const val = document.getElementById(id).value.trim();
    if (val !== "") {
      payload[fieldMap[id]] = isNaN(val) ? val : Number(val);
    }
  });

  if (Object.keys(payload).length === 0) return;

  const start = performance.now();

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: payload }),
    });

    const latency = Math.round(performance.now() - start);
    const data = await res.json();
    const risk = data.total_risk ?? 0;

    latencyEl.textContent = latency;
    riskEl.textContent = risk.toFixed(2);

    // Color risk value
    if (risk > 0.8) {
      riskEl.style.color = "var(--risk-critical)";
    } else if (risk > 0.5) {
      riskEl.style.color = "#F57F17";
    } else {
      riskEl.style.color = "var(--risk-low)";
    }

    // Alert box
    if (risk > 0.8) {
      setAlert("critical", "🚨", "تحذير حرج — تناقضات عالية في البيانات");
    } else if (risk > 0.5) {
      setAlert("warning", "⚠️", "تحذير قوي — يوجد تناقضات محتملة");
    } else if (risk > 0) {
      setAlert("warning", "💡", "تحذير بسيط — تحقق من البيانات");
    } else {
      setAlert("success", "✅", "البيانات متسقة — لا توجد مشكلات");
    }

    // Show issues if any
    if (data.issues && data.issues.length > 0) {
      detailsSection.style.display = "block";
      issuesList.innerHTML = data.issues
        .map(
          (i) => `
        <div class="issue-item">
            ${i.description}<br>
            <em style="color: #666;">💡 ${i.suggestion}</em>
        </div>
    `,
        )
        .join("");
    } else {
      detailsSection.style.display = "none";
      issuesList.innerHTML = "";
    }
  } catch (err) {
    latencyEl.textContent = "—";
    riskEl.textContent = "—";
    riskEl.style.color = "";
    setAlert("critical", "❌", "خطأ في الاتصال بالخادم");
    detailsSection.style.display = "none";
  }
}

function setAlert(type, icon, text) {
  alertBox.className = "alert-box " + type;
  alertIcon.textContent = icon;
  alertText.textContent = text;
}