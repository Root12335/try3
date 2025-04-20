document.addEventListener("DOMContentLoaded", function () {
  // Current date display
  const currentDateElement = document.getElementById("currentDate");
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  currentDateElement.textContent = today.toLocaleDateString("ar-SA", options);

  // Navigation
  const navLinks = document.querySelectorAll(".sidebar-nav a");
  const contentSections = document.querySelectorAll(".content-section");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetSection = this.getAttribute("data-section");
      if (!targetSection) return;

      e.preventDefault();

      // Update active nav link
      navLinks.forEach((navLink) => navLink.classList.remove("active"));
      this.classList.add("active");

      // Show target section
      contentSections.forEach((section) => section.classList.remove("active"));
      document.getElementById(targetSection).classList.add("active");
    });
  });

  // Profile photo preview
  const profilePhotoInput = document.getElementById("profilePhotoInput");
  const profilePhotoPreview = document.getElementById("profilePhotoPreview");
  const profilePhoto = document.querySelector(".profile-photo");

  if (profilePhotoInput && profilePhotoPreview && profilePhoto) {
    profilePhoto.addEventListener("click", () => profilePhotoInput.click());

    profilePhotoInput.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          profilePhotoPreview.src = e.target.result;
          document.getElementById("sidebarAvatar").src = e.target.result;
        };

        reader.readAsDataURL(this.files[0]);
      }
    });
  }

  // Course thumbnail preview
  const courseThumbnail = document.getElementById("courseThumbnail");
  const thumbnailPreview = document.getElementById("thumbnailPreview");

  if (courseThumbnail && thumbnailPreview) {
    thumbnailPreview.addEventListener("click", () => courseThumbnail.click());

    courseThumbnail.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          thumbnailPreview.style.backgroundImage = `url('${e.target.result}')`;
          thumbnailPreview.innerHTML = "";
        };

        reader.readAsDataURL(this.files[0]);
      }
    });
  }

  // Skills management
  const skillInput = document.getElementById("skillInput");
  const addSkillBtn = document.getElementById("addSkillBtn");
  const skillsContainer = document.getElementById("skillsContainer");

  if (skillInput && addSkillBtn && skillsContainer) {
    addSkillBtn.addEventListener("click", function () {
      const skillValue = skillInput.value.trim();
      if (skillValue) {
        addSkill(skillValue);
        skillInput.value = "";
      }
    });

    skillInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        addSkillBtn.click();
      }
    });

    // Add skill function
    function addSkill(skillName) {
      const skillTag = document.createElement("div");
      skillTag.className = "skill-tag";
      skillTag.innerHTML = `
        ${skillName}
        <span class="remove-skill"><i class="fas fa-times"></i></span>
      `;

      skillTag.querySelector(".remove-skill").addEventListener("click", function () {
        skillTag.remove();
      });

      skillsContainer.appendChild(skillTag);
    }

    // Initialize remove skill buttons
    document.querySelectorAll(".remove-skill").forEach((btn) => {
      btn.addEventListener("click", function () {
        this.closest(".skill-tag").remove();
      });
    });
  }

  // Course sections management
  const addSectionBtn = document.querySelector(".add-section-btn");
  const courseSectionsContainer = document.querySelector(".course-sections-container");

  if (addSectionBtn && courseSectionsContainer) {
    let sectionCount = document.querySelectorAll(".course-section-item").length;

    addSectionBtn.addEventListener("click", function () {
      sectionCount++;
      const newSection = document.createElement("div");
      newSection.className = "course-section-item";
      newSection.innerHTML = `
        <div class="section-header">
          <h3>القسم ${sectionCount}</h3>
          <button type="button" class="btn-icon remove-section-btn">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="form-group">
          <label>عنوان القسم <span class="required">*</span></label>
          <input type="text" name="sections[${sectionCount - 1}][title]" required />
        </div>
        
        <div class="form-group">
          <label>وصف القسم</label>
          <textarea name="sections[${sectionCount - 1}][description]" rows="2"></textarea>
        </div>
        
        <div class="lessons-container">
          <h4>الدروس</h4>
          
          <div class="lesson-item">
            <div class="lesson-header">
              <h5>الدرس 1</h5>
              <button type="button" class="btn-icon remove-lesson-btn">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <div class="form-group">
              <label>عنوان الدرس <span class="required">*</span></label>
              <input type="text" name="sections[${sectionCount - 1}][lessons][0][title]" required />
            </div>
            
            <div class="form-group">
              <label>نوع المحتوى <span class="required">*</span></label>
              <select name="sections[${sectionCount - 1}][lessons][0][type]" class="lesson-type" required>
                <option value="video">فيديو</option>
                <option value="text">نص</option>
                <option value="assignment">واجب</option>
              </select>
            </div>
            
            <div class="form-group lesson-content-video">
              <label>رابط الفيديو <span class="required">*</span></label>
              <input type="url" name="sections[${sectionCount - 1}][lessons][0][videoUrl]" />
            </div>
          </div>
          
          <button type="button" class="btn btn-secondary btn-sm add-lesson-btn">
            <i class="fas fa-plus"></i> إضافة درس
          </button>
        </div>
      `;

      courseSectionsContainer.appendChild(newSection);
      initSectionEvents(newSection, sectionCount - 1);
    });

    // Initialize section events
    function initSectionEvents(sectionElement, sectionIndex) {
      const removeSectionBtn = sectionElement.querySelector(".remove-section-btn");
      const addLessonBtn = sectionElement.querySelector(".add-lesson-btn");
      const lessonsContainer = sectionElement.querySelector(".lessons-container");

      // Remove section
      removeSectionBtn.addEventListener("click", function () {
        sectionElement.remove();
      });

      // Add lesson
      addLessonBtn.addEventListener("click", function () {
        const lessonItems = lessonsContainer.querySelectorAll(".lesson-item");
        const lessonCount = lessonItems.length;
        const newLesson = document.createElement("div");
        newLesson.className = "lesson-item";
        newLesson.innerHTML = `
          <div class="lesson-header">
            <h5>الدرس ${lessonCount + 1}</h5>
            <button type="button" class="btn-icon remove-lesson-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="form-group">
            <label>عنوان الدرس <span class="required">*</span></label>
            <input type="text" name="sections[${sectionIndex}][lessons][${lessonCount}][title]" required />
          </div>
          
          <div class="form-group">
            <label>نوع المحتوى <span class="required">*</span></label>
            <select name="sections[${sectionIndex}][lessons][${lessonCount}][type]" class="lesson-type" required>
              <option value="video">فيديو</option>
              <option value="text">نص</option>
              <option value="assignment">واجب</option>
            </select>
          </div>
          
          <div class="form-group lesson-content-video">
            <label>رابط الفيديو <span class="required">*</span></label>
            <input type="url" name="sections[${sectionIndex}][lessons][${lessonCount}][videoUrl]" />
          </div>
        `;

        lessonsContainer.insertBefore(newLesson, addLessonBtn);
        initLessonEvents(newLesson);
      });

      // Initialize existing lessons
      sectionElement.querySelectorAll(".lesson-item").forEach((lesson) => {
        initLessonEvents(lesson);
      });
    }

    // Initialize lesson events
    function initLessonEvents(lessonElement) {
      const removeLessonBtn = lessonElement.querySelector(".remove-lesson-btn");
      const lessonTypeSelect = lessonElement.querySelector(".lesson-type");

      // Remove lesson
      removeLessonBtn.addEventListener("click", function () {
        lessonElement.remove();
      });

      // Lesson type change
      if (lessonTypeSelect) {
        lessonTypeSelect.addEventListener("change", function () {
          updateLessonContentFields(lessonElement, this.value);
        });
      }
    }
        // Update lesson content fields based on type
        function updateLessonContentFields(lessonElement, lessonType) {
          // Remove existing content fields
          lessonElement.querySelectorAll('.lesson-content-video, .lesson-content-text, .lesson-content-assignment').forEach(el => {
            el.remove();
          });
          
          // Add appropriate content field based on type
          const formGroup = document.createElement('div');
          formGroup.className = 'form-group';
          
          switch (lessonType) {
            case 'video':
              formGroup.classList.add('lesson-content-video');
              formGroup.innerHTML = `
                <label>رابط الفيديو <span class="required">*</span></label>
                <input type="url" name="videoUrl" required />
              `;
              break;
            case 'text':
              formGroup.classList.add('lesson-content-text');
              formGroup.innerHTML = `
                <label>محتوى النص <span class="required">*</span></label>
                <textarea rows="4" name="textContent" required></textarea>
              `;
              break;
            case 'assignment':
              formGroup.classList.add('lesson-content-assignment');
              formGroup.innerHTML = `
                <label>وصف الواجب <span class="required">*</span></label>
                <textarea rows="4" name="assignmentDescription" required></textarea>
              `;
              break;
          }
          
          lessonElement.appendChild(formGroup);
        }
      }
    
      // Initialize existing sections
      document.querySelectorAll('.course-section-item').forEach((section, index) => {
        initSectionEvents(section, index);
      });
    
      // Mentor modal
      const addNewMentorBtn = document.getElementById('addNewMentorBtn');
      const openMentorModalBtn = document.getElementById('openMentorModal');
      const mentorModal = document.getElementById('mentorModal');
      const closeModalBtns = document.querySelectorAll('.close-modal');
      const saveMentorBtn = document.getElementById('saveMentorBtn');
      const addMentorForm = document.getElementById('addMentorForm');
      const selectedMentors = document.getElementById('selectedMentors');
    
      if (mentorModal) {
        // Open modal
        [addNewMentorBtn, openMentorModalBtn].forEach(btn => {
          if (btn) {
            btn.addEventListener('click', function() {
              mentorModal.classList.add('active');
            });
          }
        });
    
        // Close modal
        closeModalBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            mentorModal.classList.remove('active');
          });
        });
    
        // Close modal when clicking outside
        mentorModal.addEventListener('click', function(e) {
          if (e.target === mentorModal) {
            mentorModal.classList.remove('active');
          }
        });
    
        // Save mentor
        if (saveMentorBtn && addMentorForm) {
          saveMentorBtn.addEventListener('click', function() {
            const mentorName = document.getElementById('mentorName').value.trim();
            const mentorEmail = document.getElementById('mentorEmail').value.trim();
            const mentorSpecialty = document.getElementById('mentorSpecialty').value.trim();
    
            if (!mentorName || !mentorEmail || !mentorSpecialty) {
              alert('يرجى ملء جميع الحقول المطلوبة');
              return;
            }
    
            // Add mentor to selected mentors (for course creation)
            if (selectedMentors) {
              const mentorTag = document.createElement('div');
              mentorTag.className = 'skill-tag';
              mentorTag.innerHTML = `
                ${mentorName}
                <span class="remove-skill"><i class="fas fa-times"></i></span>
              `;
    
              mentorTag.querySelector('.remove-skill').addEventListener('click', function() {
                mentorTag.remove();
              });
    
              selectedMentors.appendChild(mentorTag);
            }
    
            // Add mentor to mentors list (for mentors section)
            const mentorsGrid = document.querySelector('.mentors-grid');
            if (mentorsGrid) {
              const mentorCard = document.createElement('div');
              mentorCard.className = 'mentor-card';
              mentorCard.innerHTML = `
                <div class="mentor-avatar">
                  <img src="https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}" alt="${mentorName}" />
                </div>
                <div class="mentor-info">
                  <h3 class="mentor-name">${mentorName}</h3>
                  <p class="mentor-specialty">${mentorSpecialty}</p>
                  <p class="mentor-email">${mentorEmail}</p>
                </div>
                <div class="mentor-courses">
                  <span class="courses-count">0 دورات</span>
                </div>
                <div class="mentor-actions">
                  <button class="btn btn-icon btn-secondary">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-icon btn-danger">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              `;
    
              mentorsGrid.appendChild(mentorCard);
            }
    
            // Reset form and close modal
            addMentorForm.reset();
            mentorModal.classList.remove('active');
          });
        }
      }
    
      // Form submissions
      const profileForm = document.getElementById('profileForm');
      const addCourseForm = document.getElementById('addCourseForm');
      
      if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Update instructor name in sidebar and header
          const fullName = document.getElementById('fullName').value;
          const specialty = document.getElementById('specialty').value;
          
          document.getElementById('instructorName').textContent = fullName;
          document.getElementById('headerInstructorName').textContent = fullName.split(' ')[0];
          document.getElementById('instructorSpecialty').textContent = 
            specialty === 'programming' ? 'مدرب البرمجة' :
            specialty === 'design' ? 'مدرب التصميم' :
            specialty === 'marketing' ? 'مدرب التسويق' :
            specialty === 'business' ? 'مدرب إدارة الأعمال' :
            specialty === 'languages' ? 'مدرب اللغات' : 'مدرب';
          
          // Show success message
          alert('تم حفظ الملف الشخصي بنجاح');
        });
      }
      
      if (addCourseForm) {
        addCourseForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const courseTitle = document.getElementById('courseTitle').value;
          const courseCategory = document.getElementById('courseCategory').value;
          
          if (!courseTitle || !courseCategory) {
            alert('يرجى ملء جميع الحقول المطلوبة');
            return;
          }
          
          // Add course to courses grid
          const coursesGrid = document.querySelector('.courses-grid');
          if (coursesGrid) {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
              <div class="course-status draft">مسودة</div>
              <div class="course-image">
                <img src="${thumbnailPreview.style.backgroundImage ? thumbnailPreview.style.backgroundImage.slice(5, -2) : 'assets/course-placeholder.jpg'}" alt="${courseTitle}" />
              </div>
              <div class="course-content">
                <h3 class="course-title">${courseTitle}</h3>
                <div class="course-meta">
                  <div class="meta-item">
                    <i class="fas fa-users"></i>
                    <span>0 طالب</span>
                  </div>
                  <div class="meta-item">
                    <i class="fas fa-star"></i>
                    <span>0.0</span>
                  </div>
                </div>
                <div class="course-details">
                  <div class="detail-item">
                    <i class="fas fa-layer-group"></i>
                    <span>${document.querySelectorAll('.course-section-item').length} أقسام</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>0 ساعة</span>
                  </div>
                </div>
                <div class="course-mentors">
                  <span class="mentor-label">المرشدين:</span>
                  <div class="mentor-avatars">
                    <div class="add-mentor-icon">
                      <i class="fas fa-plus"></i>
                    </div>
                  </div>
                </div>
                <div class="course-actions">
                  <button class="btn btn-icon btn-secondary">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn btn-icon btn-secondary">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-icon btn-danger">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            `;
            
            coursesGrid.prepend(courseCard);
            
            // Reset form and redirect to courses section
            addCourseForm.reset();
            thumbnailPreview.style.backgroundImage = '';
            thumbnailPreview.innerHTML = `<i class="fas fa-image"></i><span>اختر صورة</span>`;
            document.querySelector('.nav-link[data-section="courses"]').click();
            
            // Show success message
            alert('تم إنشاء الدورة بنجاح');
          }
        });
      }
    
      // Save draft button
      const saveDraftBtn = document.getElementById('saveDraftBtn');
      if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
          alert('تم حفظ الدورة كمسودة');
        });
      }
    });