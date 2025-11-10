// main.js - form validation and SVG tooltip/highlight logic
document.addEventListener('DOMContentLoaded', function(){
	// Quiz form validation
	const quiz = document.querySelector('.quiz-form');
	if(quiz){
		quiz.addEventListener('submit', function(e){
			e.preventDefault();
			const q1 = quiz.querySelector('input[name="q1"]:checked');
			const q2 = quiz.querySelectorAll('input[name="q2"]:checked');
			let ok = true;
			let msg = '';
			if(!q1){ ok = false; msg += 'Por favor responde la pregunta 1.\n'; }
			if(q2.length === 0){ ok = false; msg += 'Por favor marca al menos una opción de la pregunta 2.\n'; }
			const existing = quiz.querySelector('.form-message');
			if(existing) existing.remove();
			const div = document.createElement('div');
			div.className = 'form-message';
			if(!ok){ div.classList.add('error'); div.textContent = msg; quiz.prepend(div); }
			else { div.classList.add('success'); div.textContent = 'Respuestas enviadas. ¡Gracias!'; quiz.prepend(div); quiz.reset(); }
		});
	}

	// Submit form validation (entrega)
	const submitForm = document.querySelector('.submit-form');
	if(submitForm){
		submitForm.addEventListener('submit', function(e){
			e.preventDefault();
			const name = submitForm.querySelector('#stu');
			const email = submitForm.querySelector('#email2');
			const file = submitForm.querySelector('#file');
			const existing = submitForm.querySelector('.form-message');
			if(existing) existing.remove();
			const div = document.createElement('div');
			div.className = 'form-message';
			let ok = true;
			let msg = '';
			if(!name.value.trim()){ ok=false; msg += 'Nombre requerido.\n'; }
			if(!email.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)){ ok=false; msg += 'Correo inválido.\n'; }
			if(!file.files || file.files.length === 0){ ok=false; msg += 'Adjunta tu archivo (ZIP o PDF).\n'; }
			else {
				const allowed = ['application/zip','application/pdf'];
				if(!allowed.includes(file.files[0].type)){
					ok=false; msg += 'Tipo de archivo no permitido (usar ZIP o PDF).\n';
				}
			}
			if(!ok){ div.classList.add('error'); div.textContent = msg; submitForm.prepend(div); }
			else { div.classList.add('success'); div.textContent = 'Entrega recibida (simulada).'; submitForm.prepend(div); submitForm.reset(); }
		});
	}

	// SVG plan tooltip and highlight
	const plan = document.getElementById('housePlan');
	const tooltip = document.getElementById('plan-tooltip');
	if(plan && tooltip){
		const areas = plan.querySelectorAll('.plan-area');
		areas.forEach(function(r){
			const id = r.id; // e.g. rect-sala
			const name = id.replace('rect-','');
			r.addEventListener('mouseenter', function(ev){
				r.classList.add('hover');
				tooltip.textContent = name.charAt(0).toUpperCase() + name.slice(1);
				tooltip.hidden = false;
			});
			r.addEventListener('mousemove', function(ev){
				const rect = plan.getBoundingClientRect();
				tooltip.style.left = (ev.clientX - rect.left + 12) + 'px';
				tooltip.style.top = (ev.clientY - rect.top + 12) + 'px';
			});
			r.addEventListener('mouseleave', function(){ r.classList.remove('hover'); tooltip.hidden = true; });
		});
		// also enable keyboard focus on links
		const links = plan.querySelectorAll('.plan-link');
		links.forEach(function(a){
			a.addEventListener('focus', function(e){
				const rect = a.querySelector('.plan-area'); if(rect) rect.classList.add('hover');
			});
			a.addEventListener('blur', function(e){
				const rect = a.querySelector('.plan-area'); if(rect) rect.classList.remove('hover');
			});
		});
	}
});
