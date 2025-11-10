// Load header/footer templates and automatically highlight active menu links
document.addEventListener("DOMContentLoaded", function () {

	// Load includes
	document.querySelectorAll("[data-include]").forEach(el => {
		const file = el.getAttribute("data-include");

		fetch(file)
			.then(response => response.text())
			.then(html => {
				el.innerHTML = html;

				// After the HTML is inserted, detect active nav
				highlightActiveNav();
			})
			.catch(err => {
				console.error("Include error:", file, err);
			});
	});

	function highlightActiveNav() {
		const path = window.location.pathname.replace(/\/$/, ""); // remove trailing slash
		const links = document.querySelectorAll(".main-menu a");

		links.forEach(link => {
			const href = link.getAttribute("href").replace(/\/$/, "");

			// Match root
			if ((href === "" || href === "/") && path === "") {
				link.parentElement.classList.add("active");
			}

			// Match other pages
			if (href === path) {
				link.parentElement.classList.add("active");
			}
		});
	}

});