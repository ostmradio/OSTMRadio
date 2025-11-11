document.addEventListener("click", function (e) {
	const toggle = e.target.closest(".nav-switch");
	if (!toggle) return;

	const menu = document.querySelector(".main-menu");
	if (!menu) return;

	menu.classList.toggle("open");
});