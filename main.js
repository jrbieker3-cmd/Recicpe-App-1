import { db, spoonacularKey } from "./firebase.js";

// 🔍 Fetch recipe from Spoonacular
async function fetchRecipe() {
  const urlInput = document.getElementById("recipeUrlInput");
  if (!urlInput) {
    console.error("❌ Missing input element with ID 'recipeUrlInput'");
    return;
  }

  const url = urlInput.value.trim();
  if (!url || !url.startsWith("http")) {
    alert("Please enter a valid recipe URL");
    return;
  }

  const endpoint = `https://api.spoonacular.com/recipes/extract?url=${encodeURIComponent(url)}&apiKey=${spoonacularKey}`;

  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    console.log("✅ Spoonacular data:", data);

    populateRecipeForm(data);
  } catch (err) {
    console.error("❌ Spoonacular fetch error:", err);
    alert("Failed to fetch recipe. Check console for details.");
  }
}

// 🧠 Example form population function
function populateRecipeForm(data) {
  console.log("🧪 Populating form with:", data.title, data.ingredients);
}

// 📄 Page switching logic
function showPage(pageId) {
  const allPages = document.querySelectorAll("body > div");
  allPages.forEach(page => page.classList.add("hidden"));

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.remove("hidden");
  } else {
    console.warn(`Page with ID '${pageId}' not found`);
  }
}

// 🚀 Initialize app once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetchRecipeBtn");
  if (fetchBtn) {
    fetchBtn.addEventListener("click", fetchRecipe);
  } else {
    console.error("❌ Missing button with ID 'fetchRecipeBtn'");
  }

  showPage("plannerPage"); // 👈 Set your default visible page here
});
