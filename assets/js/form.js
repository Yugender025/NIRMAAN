document
  .getElementById("enrollmentForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = document.forms["google-sheet"];
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Get form elements
    const formElements = {
      name: document.getElementById("name"),
      mobile: document.getElementById("mobile"),
      email: document.getElementById("email"),
      date: document.getElementById("date"),
      message: document.getElementById("message"),
    };

    // Reset previous error states
    Object.keys(formElements).forEach((key) => {
      const element = formElements[key];
      const labelId = `${key}Label`;
      if (element && document.getElementById(labelId)) {
        resetErrorState(element, labelId);
      }
    });

    // Validate form
    let isValid = true;
    Object.entries(formElements).forEach(([key, element]) => {
      if (!element || !element.value.trim()) {
        if (element && document.getElementById(`${key}Label`)) {
          setErrorState(element, `${key}Label`);
        }
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner"></span> Submitting...';

      const scriptURL =
        "https://script.google.com/macros/s/AKfycbyW4kyVg0HByok4Tw28Y3lECsA87LUiZ-1-Q4i_3-5_533GajAgaBJoOdZ923jOtTV7/exec";

      // Add timeout to ensure minimum loading time for better UX
      const [response] = await Promise.all([
        fetch(scriptURL, {
          method: "POST",
          body: new FormData(form),
        }),
        new Promise((resolve) => setTimeout(resolve, 800)), // Minimum 800ms loading time
      ]);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Success
      alert("Thanks for contacting us! We will get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Error!", error.message);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });

function setErrorState(element, labelId) {
  element.classList.add("error-input");
  const label = document.getElementById(labelId);
  if (label) {
    label.classList.add("error-label");
  }
}

function resetErrorState(element, labelId) {
  element.classList.remove("error-input");
  const label = document.getElementById(labelId);
  if (label) {
    label.classList.remove("error-label");
  }
}

// Add this CSS to your stylesheet
const style = document.createElement("style");
style.textContent = `
.spinner {
display: inline-block;
width: 20px;
height: 20px;
border: 3px solid rgba(255,255,255,.3);
border-radius: 50%;
border-top-color: #fff;
animation: spin 1s ease-in-out infinite;
margin-right: 8px;
}

@keyframes spin {
to { transform: rotate(360deg); }
}

.error-input {
border-color: #dc3545;
}

.error-label {
color: #dc3545;
}
`;
document.head.appendChild(style);

function showContactModal() {
  document.getElementById("contactModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function hideContactModal() {
  document.getElementById("contactModal").classList.add("hidden");
  document.body.style.overflow = "";
}
document
  .getElementById("contactFormModal")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    hideContactModal();

    const successModal = document.createElement("div");
    successModal.className =
      "fixed inset-0 bg-black/50 flex items-center justify-center z-50";
    successModal.innerHTML = `
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 animate-scaleIn">
      <h3 class="text-2xl font-semibold text-primary mb-4">Thank You!</h3>
      <p class="text-gray-600 mb-6">We have received your request and will contact you shortly to confirm your site visit.</p>
      <button onclick="this.closest('.fixed').remove(); document.body.style.overflow = '';" class="!rounded-button bg-primary text-white px-6 py-2 w-full hover:bg-primary/90">
        Close
      </button>
    </div>
  `;
    document.body.appendChild(successModal);
    this.reset();
  });
// Intersection Observer for scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  },
  {
    threshold: 0.1,
  }
);
document.addEventListener("DOMContentLoaded", function () {
  // Add animation classes to section titles
  document.querySelectorAll("section h2").forEach((title) => {
    title.classList.add("animate-fadeInUp");
    title.style.animationPlayState = "paused";
    observer.observe(title);
  });
  // Add animation to grid items
  document.querySelectorAll(".grid > div").forEach((item, index) => {
    item.classList.add("animate-scaleIn");
    item.style.animationPlayState = "paused";
    item.style.animationDelay = `${index * 0.05}s`;
    observer.observe(item);
  });
});
document
  .getElementById("contactForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    const successModal = document.createElement("div");
    successModal.className =
      "fixed inset-0 bg-black/50 flex items-center justify-center z-50";
    successModal.innerHTML = `
<div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
<h3 class="text-2xl font-semibold text-primary mb-4">Thank You!</h3>
<p class="text-gray-600 mb-6">We have received your request and will contact you shortly to confirm your site visit.</p>
<button onclick="this.closest('.fixed').remove()" class="!rounded-button bg-primary text-white px-6 py-2 w-full hover:bg-primary/90">
Close
</button>
</div>
`;
    document.body.appendChild(successModal);
    this.reset();
  });
