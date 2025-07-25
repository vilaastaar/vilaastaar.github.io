document.addEventListener('DOMContentLoaded', function() {
    // تولید خودکار پروژه‌های گالری
    const gallery = document.querySelector('.gallery');
    const totalProjects = 30;
    
    for (let i = 1; i <= totalProjects; i++) {
        gallery.innerHTML += `
            <div class="gallery-item">
                <img src="images/project${i}.jpg" loading="lazy" alt="پروژه ${i}" class="lightbox-img">
            </div>
        `;
    }

    // تولید خودکار زمین‌ها
    const landsContainer = document.querySelector('.lands-container');
    const landLocations = ['نوشهر', 'رامسر', 'نور', 'چالوس', 'نمکآبرود', 'کلاردشت'];
    const landTypes = ['ساحلی', 'جنگلی', 'کوهستانی', 'روستایی', 'ویلایی'];
    
    for (let i = 1; i <= 6; i++) {
        const randomLocation = landLocations[Math.floor(Math.random() * landLocations.length)];
        const randomType = landTypes[Math.floor(Math.random() * landTypes.length)];
        const randomArea = Math.floor(Math.random() * 500) + 100;
        const randomPrice = (Math.floor(Math.random() * 50) + 5;
        
        landsContainer.innerHTML += `
            <div class="land-card">
                <div class="land-image">
                    <img src="images/land${i}.jpg" loading="lazy" alt="زمین ${randomLocation}">
                </div>
                <div class="land-details">
                    <h3 class="land-title">زمین ${randomType} در ${randomLocation}</h3>
                    <p class="land-location"><i class="fas fa-map-marker-alt"></i> ${randomLocation}</p>
                    <p class="land-area"><i class="fas fa-ruler-combined"></i> متراژ: ${randomArea} متر</p>
                    <p class="land-type"><i class="fas fa-home"></i> نوع: زمین ${randomType}</p>
                    <p class="land-price">قیمت: ${randomPrice} میلیون تومان</p>
                    <button class="contact-btn" onclick="sendWhatsapp()">مشاوره رایگان</button>
                </div>
            </div>
        `;
    }

    // اسکریپت ارسال واتساپ
    window.sendWhatsapp = function() {
        const phone = "989122234298";
        const text = encodeURIComponent("سلام، درباره زمین‌های شمال اطلاعات می‌خواستم.");
        window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    };
    
    // رویدادهای دکمه‌های واتساپ
    document.querySelectorAll('.whatsapp-float, .whatsapp-contact, footer a[href*="whatsapp"]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            sendWhatsapp();
        });
    });

    // اسکریپت Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const images = document.querySelectorAll('.lightbox-img');
    let currentImageIndex = 0;

    // باز کردن Lightbox
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
        });
    });

    // بستن Lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // کلیک روی پس‌زمینه برای بستن
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // پیمایش تصاویر
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].alt;
    });

    // پیمایش با کلیدهای کیبورد
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                lightboxImg.src = images[currentImageIndex].src;
                lightboxImg.alt = images[currentImageIndex].alt;
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                lightboxImg.src = images[currentImageIndex].src;
                lightboxImg.alt = images[currentImageIndex].alt;
            }
        }
    });

    // اسکریپت اسلایدر نظرات مشتریان
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        testimonials[index].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    // نمایش اولین نظر
    showTestimonial(0);

    // اعتبارسنجی فرم تماس
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('success-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // اعتبارسنجی نام
        const name = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        if (name.value.trim() === '') {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        // اعتبارسنجی شماره تماس
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        const phoneRegex = /^09[0-9]{9}$/;
        if (!phoneRegex.test(phone.value)) {
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }

        // اعتبارسنجی ایمیل
        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        if (email.value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        // اعتبارسنجی پیام
        const message = document.getElementById('message');
        const messageError = document.getElementById('message-error');
        if (message.value.trim() === '') {
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.style.display = 'none';
        }

        // اگر فرم معتبر بود
        if (isValid) {
            contactForm.reset();
            successMessage.style.display = 'block';
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
});