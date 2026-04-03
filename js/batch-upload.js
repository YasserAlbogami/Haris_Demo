// ===== Batch Upload & Validation =====
const API_URL = "https://optimizers-haris.onrender.com/batch-validate";

const uploadZone = document.getElementById("uploadZone");
const fileInput = document.getElementById("fileInput");
const fileNameEl = document.getElementById("fileName");
const processBtn = document.getElementById("processBtn");
const spinner = document.getElementById("spinner");
const resultsSection = document.getElementById("resultsSection");
const resultsBody = document.getElementById("resultsBody");

let selectedFile = null;

// Click to upload
uploadZone.addEventListener("click", () => fileInput.click());

// File selected
fileInput.addEventListener("change", (e) => {
  handleFile(e.target.files[0]);
});

// Drag & drop
uploadZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadZone.classList.add("dragover");
});
uploadZone.addEventListener("dragleave", () => {
  uploadZone.classList.remove("dragover");
});
uploadZone.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadZone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});

function handleFile(file) {
  if (!file) return;
  const validExtensions = [".xlsx", ".csv"];
  const lowerName = file.name.toLowerCase();
  if (!validExtensions.some((extension) => lowerName.endsWith(extension))) {
    alert("يرجى رفع ملف بصيغة .csv أو .xlsx فقط");
    return;
  }
  selectedFile = file;
  fileNameEl.textContent = "📄 " + file.name;
  processBtn.disabled = false;
}

// Process
processBtn.addEventListener("click", async () => {
  if (!selectedFile) return;

  processBtn.disabled = true;
  spinner.classList.add("active");
  resultsSection.style.display = "none";
  resultsBody.innerHTML = "";

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) {
      const message = data.detail || data.message || "فشل التحقق من الملف";
      alert(message);
      return;
    }

    renderResults(data.results || []);
  } catch (err) {
    alert("خطأ في الاتصال بالخادم. تأكد من تشغيل الخادم على المنفذ 8000.");
  } finally {
    spinner.classList.remove("active");
    processBtn.disabled = false;
  }
});

function renderResults(results) {
  if (!Array.isArray(results) || results.length === 0) {
    resultsBody.innerHTML =
      '<tr><td colspan="4" style="text-align:center; padding:24px; color:var(--gastat-gray-500);">لا توجد نتائج</td></tr>';
    resultsSection.style.display = "block";
    return;
  }

  resultsBody.innerHTML = results
    .map((row, i) => {
      const risk = row.risk_score ?? row.total_risk ?? 0;
      const riskClass = risk > 0.8 ? "high" : risk > 0.5 ? "medium" : "low";
      const issues = row.issues || [];
      const rowIndex = row.row_index ?? i + 1;

      return `<tr>
      <td>${rowIndex}</td>
      <td>${row.f_m_id || row.record_id || "—"}</td>
      <td><span class="risk-badge ${riskClass}">${risk.toFixed(2)}</span></td>
      <td>
        ${
          issues.length > 0
            ? `<ul class="issues-list">${issues
                .map(
                  (x) =>
                    `<li> ${x.description}<br><em style="color: #666;">💡 ${x.suggestion}</em></li>`
                )
                .join("")}</ul>`
            : '<span style="color: var(--risk-low);">✅ لا توجد مشكلات</span>'
        }
      </td>
    </tr>`;
    })
    .join("");

  resultsSection.style.display = "block";
}
