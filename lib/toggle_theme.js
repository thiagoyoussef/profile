const toggleTheme = document.getElementById('toggle-theme');

toggleTheme.addEventListener('change', () => {
   const targetTheme = document.body.getAttribute('data-theme') === 'light' ? '' : 'light';
	 document.body.setAttribute('data-theme', targetTheme);
});
