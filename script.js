document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('add-education').addEventListener('click', function() {
        const educationList = document.getElementById('education-list');
        const newEducationItem = document.createElement('div');
        newEducationItem.classList.add('education-item');
        newEducationItem.innerHTML = `
            <div class="form-group">
                <label for="course">Course*</label>
                <input type="text" id="course" name="course" required>
            </div>
            <div class="form-group">
                <label for="duration">Duration*</label>
                <input type="text" id="duration" name="duration" required>
            </div>
            <div class="form-group">
                <label for="organisation">Organisation*</label>
                <input type="text" id="organisation" name="organisation" required>
            </div>
            <div class="button-group">
                <button type="button" class="delete-education">Delete</button>
            </div>
        `;
        educationList.appendChild(newEducationItem);
    });

   
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('delete-education')) {
            e.target.closest('.education-item').remove();
        }
    });

   
    document.getElementById('add-skill').addEventListener('click', function() {
        const skillsList = document.getElementById('skills-list');
        const skillInput = document.getElementById('skill');
        if (skillInput.value.trim() !== '') {
            const newSkillItem = document.createElement('div');
            newSkillItem.classList.add('form-group');
            newSkillItem.innerHTML = `
                <input type="text" value="${skillInput.value}" readonly>
                <button type="button" class="delete-skill">Delete</button>
            `;
            skillsList.appendChild(newSkillItem);
            skillInput.value = '';
        }
    });

    
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('delete-skill')) {
            e.target.closest('.form-group').remove();
        }
    });

   
    document.getElementById('add-experience').addEventListener('click', function() {
        const experienceList = document.getElementById('experience-list');
        const newExperienceItem = document.createElement('div');
        newExperienceItem.classList.add('experience-item');
        newExperienceItem.innerHTML = `
            <div class="form-group">
                <label for="job-title">Job Title*</label>
                <input type="text" id="job-title" name="job-title" required>
            </div>
            <div class="form-group">
                <label for="company-name">Company Name*</label>
                <input type="text" id="company-name" name="company-name" required>
            </div>
            <div class="form-group">
                <label for="experience-duration">Duration*</label>
                <input type="text" id="experience-duration" name="experience-duration" required>
            </div>
            <div class="button-group">
                <button type="button" class="delete-experience">Delete</button>
            </div>
        `;
        experienceList.appendChild(newExperienceItem);
    });

   
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('delete-experience')) {
            e.target.closest('.experience-item').remove();
        }
    });

    
    document.getElementById('generate-cv').addEventListener('click', function() {
        const personalDetailsForm = document.getElementById('personal-details-form');
        const educationList = document.querySelectorAll('#education-list .education-item');
        const skillsList = document.querySelectorAll('#skills-list .form-group input[type="text"]');
        const experienceList = document.querySelectorAll('#experience-list .experience-item');
        const contactMeForm = document.getElementById('contact-me-form');

        
        if (!validatePersonalDetails(personalDetailsForm)) {
            alert('Please fill in all required fields in Personal Details section.');
            return;
        }

           
           let profileImageSrc = '';
           const profileImageInput = personalDetailsForm.elements['profile-image'];
           if (profileImageInput.files.length > 0) {
               const reader = new FileReader();
               reader.onload = function(e) {
                   profileImageSrc = e.target.result;
                   generateAndPrintCV(profileImageSrc);
               };
               reader.readAsDataURL(profileImageInput.files[0]);
           } else {
               generateAndPrintCV(profileImageSrc);
           }

        
        function generateAndPrintCV(profileImageSrc) {
           
            let cvHTML = `
                <div id="cv-header">
                 <div id="cv-header-left">
                        <h1 class=cv-name>${personalDetailsForm.elements['name'].value}</h1>
                        <p>${personalDetailsForm.elements['about'].value}</p>
                        <h3>Personal Details</h3>
                        <ul>
                            <li><strong>Name:</strong> ${personalDetailsForm.elements['name'].value}</li>
                            <li><strong>Phone Number:</strong> ${personalDetailsForm.elements['phone'].value}</li>
                            <li><strong>Email:</strong> ${personalDetailsForm.elements['email'].value}</li>
                            <li><strong>About:</strong> ${personalDetailsForm.elements['about'].value}</li>
                        </ul>
                        <h3>Education</h3>
                        <ul>
            `;
         
                 
            educationList.forEach(function(educationItem) {
                cvHTML += `
                    <li>
                        <strong>Course:</strong> ${educationItem.querySelector('input[name="course"]').value}, 
                        <strong>Duration:</strong> ${educationItem.querySelector('input[name="duration"]').value}, 
                        <strong>Organisation:</strong> ${educationItem.querySelector('input[name="organisation"]').value}
                    </li>
                `;
            });
            cvHTML += `</ul><h3>Skills</h3><ul>`;
            skillsList.forEach(function(skillInput) {
                cvHTML += `<li>${skillInput.value}</li>`;
            });
            cvHTML += `</ul><h3>Experience</h3><ul>`;
            experienceList.forEach(function(experienceItem) {
                cvHTML += `
                    <li>
                        <strong>Job Title:</strong> ${experienceItem.querySelector('input[name="job-title"]').value}, 
                        <strong>Company Name:</strong> ${experienceItem.querySelector('input[name="company-name"]').value}, 
                        <strong>Duration:</strong> ${experienceItem.querySelector('input[name="experience-duration"]').value}
                    </li>
                `;
            });
            cvHTML += `</ul><h3>Contact Me</h3><ul>`;
            cvHTML += `
                <li><strong>Phone Number:</strong> ${contactMeForm.elements['contact-phone'].value}</li>
                <li><strong>Email:</strong> ${contactMeForm.elements['contact-email'].value}</li>
                <li><strong>LinkedIn:</strong> ${contactMeForm.elements['linkedin'].value}</li>
                <li><strong>Address:</strong> ${contactMeForm.elements['address'].value}</li>
            `;

           
            const cvPreview = document.getElementById('cv-preview');
            cvPreview.innerHTML = cvHTML;
            if (profileImageSrc !== '') {
                const cvHeaderLeft = document.getElementById('cv-header-left');
                const imageHTML = `<img src="${profileImageSrc}" alt="Profile Image">`;
                cvHeaderLeft.insertAdjacentHTML('afterbegin', imageHTML);
            }
            cvPreview.style.display = 'block';

           
            document.getElementById('print-cv').style.display = 'block';
        }
    });

    
    function validatePersonalDetails(form) {
        const name = form.elements['name'].value.trim();
        const phone = form.elements['phone'].value.trim();
        const email = form.elements['email'].value.trim();
        const about = form.elements['about'].value.trim();

        return (name !== '' && phone !== '' && email !== '' && about !== '');
    }

    
    document.getElementById('print-cv').addEventListener('click', function() {
       
        const cvPreview = document.getElementById('cv-preview');
        if (cvPreview.innerHTML.trim() === '') {
            alert('Please generate the CV first.');
            return;
        }

      
        window.print();
    });
});
