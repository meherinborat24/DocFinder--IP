/**
 * DocFinder - Core Application Logic
 * Vanilla JavaScript implementation for Search, Booking, Filters,
 * Authentication, Dashboard, and LocalStorage State.
 */

// ==========================================================================
// 1. Initial Mock Dataset (Based on DocFinder UI Presentation)
// ==========================================================================
const DOCFINDER_DATA = {
  doctors: [
    {
      id: "dr-ahmed-rahman",
      name: "Dr. Ahmed Rahman",
      specialty: "Cardiologist",
      degrees: "MBBS, MD (Cardiology), FCPS",
      experience: "12+ Years",
      chamber: "Central Medical Center",
      location: "Dhanmondi, Dhaka",
      fee: 800,
      rating: 4.8,
      reviewsCount: 120,
      visitingHours: "Sat-Thu: 4PM - 8PM",
      about: "Specialized in treating heart-related diseases, hypertension, and preventative cardiac care with over 12 years of clinical excellence in renowned cardiac institutions.",
      gender: "Male",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
      availableSlots: ["04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"]
    },
    {
      id: "dr-nusrat-jahan",
      name: "Dr. Nusrat Jahan",
      specialty: "Dermatologist",
      degrees: "MBBS, DDV, FCPS (Dermatology)",
      experience: "9+ Years",
      chamber: "Popular Diagnostic Center",
      location: "Dhanmondi, Dhaka",
      fee: 700,
      rating: 4.9,
      reviewsCount: 95,
      visitingHours: "Sat-Wed: 5PM - 9PM",
      about: "Expert in clinical dermatology, skin health, allergic reactions, and modern cosmetic treatments with a patient-first holistic approach.",
      gender: "Female",
      image: "https://images.unsplash.com/photo-1594824813571-638f026361a1?auto=format&fit=crop&q=80&w=400",
      availableSlots: ["05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"]
    },
    {
      id: "dr-imtiaz-hasan",
      name: "Dr. Imtiaz Hasan",
      specialty: "Pediatrician",
      degrees: "MBBS, DCH, MD (Pediatrics)",
      experience: "14+ Years",
      chamber: "Square Hospital",
      location: "Panthapath, Dhaka",
      fee: 600,
      rating: 4.7,
      reviewsCount: 140,
      visitingHours: "Everyday: 3PM - 7PM",
      about: "Senior pediatrician dedicated to infant healthcare, adolescent medicine, child vaccinations, and pediatric emergency response.",
      gender: "Male",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
      availableSlots: ["03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"]
    },
    {
      id: "dr-farhana-chowdhury",
      name: "Dr. Farhana Chowdhury",
      specialty: "Gynecologist",
      degrees: "MBBS, FCPS (OBGYN), MS",
      experience: "10+ Years",
      chamber: "Ibn Sina Medical Center",
      location: "Dhanmondi, Dhaka",
      fee: 800,
      rating: 4.8,
      reviewsCount: 110,
      visitingHours: "Mon-Fri: 4PM - 8PM",
      about: "Specialist consultant in obstetrics and gynecology, maternal health, prenatal checkups, and high-risk pregnancy care.",
      gender: "Female",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
      availableSlots: ["04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"]
    },
    {
      id: "dr-tariqul-islam",
      name: "Dr. Tariqul Islam",
      specialty: "Neurologist",
      degrees: "MBBS, MD (Neurology), MACP (USA)",
      experience: "15+ Years",
      chamber: "United Hospital",
      location: "Gulshan 2, Dhaka",
      fee: 1000,
      rating: 4.9,
      reviewsCount: 88,
      visitingHours: "Sun-Thu: 5PM - 9PM",
      about: "Consultant neurologist specializing in neuro-muscular disorders, migraines, stroke rehabilitation, and spine nerve therapy.",
      gender: "Male",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
      availableSlots: ["05:00 PM", "05:45 PM", "06:30 PM", "07:15 PM", "08:00 PM"]
    },
    {
      id: "dr-sabrina-akter",
      name: "Dr. Sabrina Akter",
      specialty: "Orthopedics",
      degrees: "MBBS, MS (Orthopedic Surgery)",
      experience: "8+ Years",
      chamber: "Evercare Hospital",
      location: "Bashundhara, Dhaka",
      fee: 750,
      rating: 4.6,
      reviewsCount: 75,
      visitingHours: "Sun-Wed: 3PM - 7PM",
      about: "Orthopedic surgeon focusing on sports injuries, bone fractures, knee arthroscopy, joint replacements, and arthritis management.",
      gender: "Female",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400",
      availableSlots: ["03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"]
    },
    {
      id: "dr-kamrul-hassan",
      name: "Dr. Kamrul Hassan",
      specialty: "General Medicine",
      degrees: "MBBS, FCPS (Internal Medicine)",
      experience: "11+ Years",
      chamber: "Labaid Specialized Hospital",
      location: "Dhanmondi, Dhaka",
      fee: 600,
      rating: 4.8,
      reviewsCount: 130,
      visitingHours: "Everyday: 10AM - 2PM",
      about: "General physician providing comprehensive treatment for diabetes, fever, infectious diseases, gastrointestinal issues, and preventive health.",
      gender: "Male",
      image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=400",
      availableSlots: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"]
    },
    {
      id: "dr-tanvir-mahmud",
      name: "Dr. Tanvir Mahmud",
      specialty: "Cardiologist",
      degrees: "MBBS, MD (Cardiology), FACC",
      experience: "16+ Years",
      chamber: "National Heart Foundation",
      location: "Mirpur, Dhaka",
      fee: 900,
      rating: 4.9,
      reviewsCount: 210,
      visitingHours: "Sun-Thu: 4PM - 8PM",
      about: "Prominent interventional cardiologist with extensive experience in coronary angioplasty, pacemaker implantations, and vascular health.",
      gender: "Male",
      image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&q=80&w=400",
      availableSlots: ["04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM"]
    }
  ],

  specialties: [
    { name: "All Specialties", icon: "bi-grid", count: 8 },
    { name: "Cardiologist", icon: "bi-heart-pulse", count: 2 },
    { name: "Dermatologist", icon: "bi-droplet", count: 1 },
    { name: "Pediatrician", icon: "bi-emoji-smile", count: 1 },
    { name: "Gynecologist", icon: "bi-gender-female", count: 1 },
    { name: "Neurologist", icon: "bi-activity", count: 1 },
    { name: "Orthopedics", icon: "bi-bandaid", count: 1 },
    { name: "General Medicine", icon: "bi-prescription2", count: 1 }
  ]
};

// ==========================================================================
// 2. Storage & State Management
// ==========================================================================
const Storage = {
  getFavorites() {
    const data = localStorage.getItem("docfinder_favorites");
    return data ? JSON.parse(data) : ["dr-ahmed-rahman"];
  },
  saveFavorites(list) {
    localStorage.setItem("docfinder_favorites", JSON.stringify(list));
  },
  toggleFavorite(id) {
    let favs = this.getFavorites();
    const index = favs.indexOf(id);
    let added = false;
    if (index > -1) {
      favs.splice(index, 1);
    } else {
      favs.push(id);
      added = true;
    }
    this.saveFavorites(favs);
    return added;
  },
  isFavorite(id) {
    return this.getFavorites().includes(id);
  },

  getAppointments() {
    const data = localStorage.getItem("docfinder_appointments");
    if (!data) {
      // Seed default demo appointment matching PDF Page 7
      const defaultAppointments = [
        {
          id: "APT-8042",
          doctorId: "dr-ahmed-rahman",
          doctorName: "Dr. Ahmed Rahman",
          specialty: "Cardiologist",
          chamber: "Central Medical Center, Dhanmondi",
          date: "15 May 2026",
          dayName: "Wednesday",
          timeSlot: "05:30 PM",
          fee: 800,
          patientName: "Sarah Khan",
          patientAge: "28",
          patientPhone: "+880 1712 345678",
          status: "Confirmed",
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem("docfinder_appointments", JSON.stringify(defaultAppointments));
      return defaultAppointments;
    }
    return JSON.parse(data);
  },
  addAppointment(appointment) {
    const appointments = this.getAppointments();
    appointments.unshift(appointment);
    localStorage.setItem("docfinder_appointments", JSON.stringify(appointments));
  },
  cancelAppointment(id) {
    const appointments = this.getAppointments();
    const target = appointments.find(a => a.id === id);
    if (target) {
      target.status = "Cancelled";
      localStorage.setItem("docfinder_appointments", JSON.stringify(appointments));
      return true;
    }
    return false;
  },

  getUser() {
    const data = localStorage.getItem("docfinder_user");
    return data ? JSON.parse(data) : null;
  },
  setUser(user) {
    localStorage.setItem("docfinder_user", JSON.stringify(user));
  },
  clearUser() {
    localStorage.removeItem("docfinder_user");
  }
};

// ==========================================================================
// 3. UI Helper Utilities (Toast Notifications, Avatars, Formatters)
// ==========================================================================
const UI = {
  showToast(message, type = "info") {
    let container = document.getElementById("df-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "df-toast-container";
      container.className = "toast-container-docfinder";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `docfinder-toast ${type}`;
    
    let icon = "bi-info-circle-fill text-primary";
    if (type === "success") icon = "bi-check-circle-fill text-success";
    if (type === "danger") icon = "bi-exclamation-triangle-fill text-danger";
    if (type === "warning") icon = "bi-exclamation-circle-fill text-warning";

    toast.innerHTML = `
      <i class="bi ${icon} fs-5"></i>
      <div class="flex-grow-1">${message}</div>
      <button type="button" class="btn-close ms-2" style="font-size:0.75rem" aria-label="Close"></button>
    `;

    toast.querySelector(".btn-close").addEventListener("click", () => toast.remove());
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  formatCurrency(amount) {
    return `৳${amount}`;
  },

  renderNavbarAuth() {
    const authWrapper = document.getElementById("nav-auth-wrapper");
    if (!authWrapper) return;

    const user = Storage.getUser();
    if (user) {
      authWrapper.innerHTML = `
        <div class="dropdown">
          <button class="btn btn-light-docfinder dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
            <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width:28px; height:28px; font-size:0.8rem; font-weight:700;">
              ${user.name.charAt(0).toUpperCase()}
            </div>
            <span class="d-none d-md-inline font-medium">${user.name}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
            <li><a class="dropdown-item" href="dashboard.html"><i class="bi bi-speedometer2 me-2 text-primary"></i> Dashboard</a></li>
            <li><a class="dropdown-item" href="dashboard.html?tab=appointments"><i class="bi bi-calendar2-check me-2 text-primary"></i> My Appointments</a></li>
            <li><a class="dropdown-item" href="dashboard.html?tab=saved"><i class="bi bi-heart me-2 text-danger"></i> Saved Doctors</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" id="nav-logout-btn"><i class="bi bi-box-arrow-right me-2"></i> Logout</a></li>
          </ul>
        </div>
      `;
      const logoutBtn = document.getElementById("nav-logout-btn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          Storage.clearUser();
          UI.showToast("Logged out successfully", "info");
          setTimeout(() => window.location.reload(), 600);
        });
      }
    } else {
      authWrapper.innerHTML = `
        <a href="login.html" class="btn btn-primary-docfinder">
          <i class="bi bi-person"></i> Login / Sign up
        </a>
      `;
    }
  },

  renderDoctorCard(doctor) {
    const isFav = Storage.isFavorite(doctor.id);
    return `
      <div class="doctor-card" data-doctor-id="${doctor.id}">
        <div class="doctor-card-content">
          <div class="doctor-avatar-box">
            <img src="${doctor.image}" alt="${doctor.name}" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=1e60d5&color=fff';">
            <span class="online-indicator" title="Available for appointments"></span>
          </div>

          <div class="doctor-info-box">
            <h3 class="doctor-name">
              <a href="doctor-details.html?id=${doctor.id}">${doctor.name}</a>
              <i class="bi bi-patch-check-fill verified-badge" title="Verified Specialist"></i>
            </h3>
            <div class="doctor-specialty-fee">
              <span>${doctor.specialty}</span> | 
              <span>Fee: <strong class="doctor-fee-highlight">${UI.formatCurrency(doctor.fee)}</strong></span>
            </div>
            
            <div class="d-flex align-items-center gap-2">
              <span class="doctor-rating-pill">
                <i class="bi bi-star-fill"></i> ${doctor.rating}
              </span>
              <span class="text-muted small">(${doctor.reviewsCount} reviews)</span>
            </div>

            <div class="doctor-meta-items">
              <span class="doctor-meta-item">
                <i class="bi bi-geo-alt text-primary"></i> ${doctor.chamber}, ${doctor.location}
              </span>
              <span class="doctor-meta-item">
                <i class="bi bi-clock text-primary"></i> ${doctor.visitingHours}
              </span>
            </div>
          </div>

          <div class="doctor-action-box">
            <button class="btn-bookmark ${isFav ? 'active' : ''}" data-doctor-id="${doctor.id}" title="Bookmark Doctor" aria-label="Bookmark">
              <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
            </button>
            <a href="doctor-details.html?id=${doctor.id}" class="btn btn-outline-docfinder">
              View Profile
            </a>
          </div>
        </div>
      </div>
    `;
  },

  initBookmarkButtons(container = document) {
    const bookmarkBtns = container.querySelectorAll(".btn-bookmark");
    bookmarkBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const docId = btn.getAttribute("data-doctor-id");
        const added = Storage.toggleFavorite(docId);
        const icon = btn.querySelector("i");

        if (added) {
          btn.classList.add("active");
          icon.className = "bi bi-heart-fill";
          UI.showToast("Doctor saved to your favorites!", "success");
        } else {
          btn.classList.remove("active");
          icon.className = "bi bi-heart";
          UI.showToast("Removed from favorites", "info");
        }
      });
    });
  }
};

// ==========================================================================
// 4. Page Controller: Homepage (index.html)
// ==========================================================================
function initHomePage() {
  // Hero Search Form submission
  const heroSearchForm = document.getElementById("hero-search-form");
  if (heroSearchForm) {
    heroSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const keyword = document.getElementById("hero-keyword-input")?.value.trim() || "";
      const specialty = document.getElementById("hero-specialty-select")?.value || "";
      const location = document.getElementById("hero-location-select")?.value || "";

      const params = new URLSearchParams();
      if (keyword) params.set("q", keyword);
      if (specialty && specialty !== "All Specialties") params.set("specialty", specialty);
      if (location && location !== "All Locations") params.set("location", location);

      window.location.href = `search.html?${params.toString()}`;
    });
  }

  // Render Featured Doctors
  const featuredContainer = document.getElementById("featured-doctors-list");
  if (featuredContainer) {
    const topDoctors = DOCFINDER_DATA.doctors.slice(0, 3);
    featuredContainer.innerHTML = topDoctors.map(doc => UI.renderDoctorCard(doc)).join("");
    UI.initBookmarkButtons(featuredContainer);
  }

  // Render Specialty Grid
  const specialtyGrid = document.getElementById("specialty-cards-grid");
  if (specialtyGrid) {
    specialtyGrid.innerHTML = DOCFINDER_DATA.specialties.filter(s => s.name !== "All Specialties").map(s => `
      <div class="col-6 col-md-4 col-lg-3">
        <a href="doctors.html?specialty=${encodeURIComponent(s.name)}" class="quick-feature-card">
          <div class="feature-icon-box">
            <i class="bi ${s.icon}"></i>
          </div>
          <h4 class="quick-feature-title">${s.name}</h4>
          <p class="quick-feature-sub">${s.count} Doctors Available</p>
        </a>
      </div>
    `).join("");
  }
}

// ==========================================================================
// 5. Page Controller: Search & Directory (search.html & doctors.html)
// ==========================================================================
function initSearchAndDirectoryPage() {
  const listContainer = document.getElementById("doctors-results-list");
  if (!listContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  let activeKeyword = urlParams.get("q") || "";
  let activeSpecialty = urlParams.get("specialty") || "All Specialties";
  let activeLocation = urlParams.get("location") || "All Locations";
  let activeSort = "rating-desc";
  let activeRating = 0;
  let activeMaxFee = 2000;
  let currentPage = 1;
  const itemsPerPage = 4;

  // Populate form inputs with URL params
  const searchInput = document.getElementById("search-keyword-input");
  if (searchInput && activeKeyword) searchInput.value = activeKeyword;

  const locationFilter = document.getElementById("filter-location-select");
  if (locationFilter && activeLocation) locationFilter.value = activeLocation;

  // Render Specialty Sidebar
  const specialtySidebar = document.getElementById("specialties-sidebar-list");
  if (specialtySidebar) {
    specialtySidebar.innerHTML = DOCFINDER_DATA.specialties.map(s => {
      const isActive = s.name.toLowerCase() === activeSpecialty.toLowerCase();
      return `
        <li class="filter-list-item">
          <a href="#" class="filter-link ${isActive ? 'active' : ''}" data-specialty="${s.name}">
            <span><i class="bi ${s.icon} me-2 text-primary"></i>${s.name}</span>
            <span class="filter-badge">${s.count}</span>
          </a>
        </li>
      `;
    }).join("");

    specialtySidebar.querySelectorAll(".filter-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        specialtySidebar.querySelectorAll(".filter-link").forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        activeSpecialty = link.getAttribute("data-specialty");
        currentPage = 1;
        applyFiltersAndRender();
      });
    });
  }

  // Filter Event Listeners
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      activeKeyword = searchInput.value.trim().toLowerCase();
      currentPage = 1;
      applyFiltersAndRender();
    });
  }

  const sortSelect = document.getElementById("sort-doctors-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      activeSort = sortSelect.value;
      applyFiltersAndRender();
    });
  }

  const feeRange = document.getElementById("filter-fee-range");
  const feeLabel = document.getElementById("fee-range-label");
  if (feeRange && feeLabel) {
    feeRange.addEventListener("input", () => {
      activeMaxFee = parseInt(feeRange.value, 10);
      feeLabel.textContent = `Up to ৳${activeMaxFee}`;
      currentPage = 1;
      applyFiltersAndRender();
    });
  }

  const ratingInputs = document.querySelectorAll('input[name="filter-rating"]');
  ratingInputs.forEach(input => {
    input.addEventListener("change", () => {
      activeRating = parseFloat(input.value) || 0;
      currentPage = 1;
      applyFiltersAndRender();
    });
  });

  const resetBtn = document.getElementById("btn-reset-filters");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      activeKeyword = "";
      activeSpecialty = "All Specialties";
      activeLocation = "All Locations";
      activeRating = 0;
      activeMaxFee = 2000;
      currentPage = 1;

      if (searchInput) searchInput.value = "";
      if (feeRange) { feeRange.value = 2000; feeLabel.textContent = "Up to ৳2000"; }
      ratingInputs.forEach(r => r.checked = r.value === "0");
      if (locationFilter) locationFilter.value = "All Locations";

      if (specialtySidebar) {
        specialtySidebar.querySelectorAll(".filter-link").forEach(l => {
          if (l.getAttribute("data-specialty") === "All Specialties") l.classList.add("active");
          else l.classList.remove("active");
        });
      }

      applyFiltersAndRender();
      UI.showToast("Filters reset", "info");
    });
  }

  function applyFiltersAndRender() {
    let results = DOCFINDER_DATA.doctors.filter(doc => {
      // Keyword match (name, specialty, chamber, degrees)
      const matchKeyword = !activeKeyword || 
        doc.name.toLowerCase().includes(activeKeyword) ||
        doc.specialty.toLowerCase().includes(activeKeyword) ||
        doc.chamber.toLowerCase().includes(activeKeyword) ||
        doc.degrees.toLowerCase().includes(activeKeyword);

      // Specialty match
      const matchSpecialty = activeSpecialty === "All Specialties" || 
        doc.specialty.toLowerCase() === activeSpecialty.toLowerCase();

      // Location match
      const matchLocation = activeLocation === "All Locations" || 
        doc.location.toLowerCase().includes(activeLocation.toLowerCase()) ||
        doc.chamber.toLowerCase().includes(activeLocation.toLowerCase());

      // Fee match
      const matchFee = doc.fee <= activeMaxFee;

      // Rating match
      const matchRating = doc.rating >= activeRating;

      return matchKeyword && matchSpecialty && matchLocation && matchFee && matchRating;
    });

    // Sorting
    if (activeSort === "rating-desc") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === "fee-asc") {
      results.sort((a, b) => a.fee - b.fee);
    } else if (activeSort === "fee-desc") {
      results.sort((a, b) => b.fee - a.fee);
    } else if (activeSort === "name-asc") {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Update Result Count
    const resultCountEl = document.getElementById("results-count-badge");
    if (resultCountEl) {
      resultCountEl.textContent = `${results.length} Doctors Found`;
    }

    // Check Empty State
    if (results.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state-box">
          <i class="bi bi-search empty-state-icon"></i>
          <h4>No doctors match your criteria</h4>
          <p class="text-muted">Try adjusting your filters, searching for another keyword, or resetting the filters.</p>
          <button class="btn btn-primary-docfinder mt-2" id="empty-state-reset-btn">
            <i class="bi bi-arrow-counterclockwise"></i> Reset Filters
          </button>
        </div>
      `;
      const emptyReset = document.getElementById("empty-state-reset-btn");
      if (emptyReset && resetBtn) emptyReset.addEventListener("click", () => resetBtn.click());
      renderPagination(0, 1);
      return;
    }

    // Pagination
    const totalPages = Math.ceil(results.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = results.slice(startIndex, startIndex + itemsPerPage);

    listContainer.innerHTML = paginatedItems.map(doc => UI.renderDoctorCard(doc)).join("");
    UI.initBookmarkButtons(listContainer);
    renderPagination(totalPages, currentPage);
  }

  function renderPagination(totalPages, activeP) {
    const paginationContainer = document.getElementById("results-pagination");
    if (!paginationContainer) return;

    if (totalPages <= 1) {
      paginationContainer.innerHTML = "";
      return;
    }

    let html = `
      <nav aria-label="Doctors pagination">
        <ul class="pagination justify-content-center">
          <li class="page-item ${activeP === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${activeP - 1}"><i class="bi bi-chevron-left"></i> Prev</a>
          </li>
    `;

    for (let p = 1; p <= totalPages; p++) {
      html += `
        <li class="page-item ${p === activeP ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${p}">${p}</a>
        </li>
      `;
    }

    html += `
          <li class="page-item ${activeP === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${activeP + 1}">Next <i class="bi bi-chevron-right"></i></a>
          </li>
        </ul>
      </nav>
    `;

    paginationContainer.innerHTML = html;
    paginationContainer.querySelectorAll(".page-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetPage = parseInt(link.getAttribute("data-page"), 10);
        if (targetPage >= 1 && targetPage <= totalPages && targetPage !== activeP) {
          currentPage = targetPage;
          applyFiltersAndRender();
          window.scrollTo({ top: listContainer.offsetTop - 100, behavior: 'smooth' });
        }
      });
    });
  }

  // Initial render
  applyFiltersAndRender();
}

// ==========================================================================
// 6. Page Controller: Doctor Profile & Interactive Booking (doctor-details.html)
// Matching PDF Page 4, 5, 6, 7
// ==========================================================================
function initDoctorDetailsPage() {
  const profileContainer = document.getElementById("doctor-profile-section");
  if (!profileContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const doctorId = urlParams.get("id") || "dr-ahmed-rahman";
  const doctor = DOCFINDER_DATA.doctors.find(d => d.id === doctorId) || DOCFINDER_DATA.doctors[0];

  // Render Doctor Profile Header & Details (Matching Page 4)
  const isFav = Storage.isFavorite(doctor.id);
  profileContainer.innerHTML = `
    <div class="profile-hero-card">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div class="d-flex align-items-center gap-3">
          <div class="profile-avatar-large">
            <img src="${doctor.image}" alt="${doctor.name}" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=1e60d5&color=fff';">
          </div>
          <div>
            <h2 class="fw-bold mb-1">${doctor.name}</h2>
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="text-primary font-semibold">${doctor.specialty}</span>
              <span>•</span>
              <span class="doctor-rating-pill"><i class="bi bi-star-fill"></i> ${doctor.rating}</span>
              <span class="text-muted small">(${doctor.reviewsCount} reviews)</span>
            </div>
            <div class="text-muted small mb-1">${doctor.degrees}</div>
            <div class="fw-bold text-primary">Consultation Fee: ${UI.formatCurrency(doctor.fee)}</div>
          </div>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-bookmark ${isFav ? 'active' : ''}" data-doctor-id="${doctor.id}" title="Save Doctor">
            <i class="bi ${isFav ? 'bi-heart-fill text-danger' : 'bi-heart'}"></i>
          </button>
          <a href="#booking-stepper-card" class="btn btn-primary-docfinder">
            <i class="bi bi-calendar-check"></i> Book Appointment
          </a>
        </div>
      </div>

      <!-- 3-Column Info row matching Page 4 -->
      <div class="info-metrics-row">
        <div class="info-metric-card">
          <div class="info-metric-label">Chamber</div>
          <div class="info-metric-value">${doctor.chamber}</div>
          <div class="text-muted small">${doctor.location}</div>
        </div>
        <div class="info-metric-card">
          <div class="info-metric-label">Visiting Hours</div>
          <div class="info-metric-value">${doctor.visitingHours}</div>
          <div class="text-muted small">Prior booking required</div>
        </div>
        <div class="info-metric-card">
          <div class="info-metric-label">Experience</div>
          <div class="info-metric-value highlight">${doctor.experience}</div>
          <div class="text-muted small">Clinical practice</div>
        </div>
      </div>

      <div class="mt-4 pt-3 border-top">
        <h5 class="fw-bold mb-2">About Doctor</h5>
        <p class="text-muted mb-0">${doctor.about}</p>
      </div>
    </div>
  `;
  UI.initBookmarkButtons(profileContainer);

  // Render Related Doctors
  const relatedContainer = document.getElementById("related-doctors-list");
  if (relatedContainer) {
    const related = DOCFINDER_DATA.doctors.filter(d => d.id !== doctor.id).slice(0, 2);
    relatedContainer.innerHTML = related.map(d => UI.renderDoctorCard(d)).join("");
    UI.initBookmarkButtons(relatedContainer);
  }

  // ==========================================================================
  // Interactive 3-Step Booking Engine (Matching Page 5, 6, 7)
  // ==========================================================================
  const bookingCard = document.getElementById("booking-stepper-card");
  if (!bookingCard) return;

  // Booking Flow State
  let bookingState = {
    step: 1, // 1: Date & Time, 2: Patient Info, 3: Confirmation
    selectedDate: "15 May 2026",
    selectedDay: "Wednesday",
    selectedTimeSlot: "05:30 PM",
    patientName: "",
    patientAge: "",
    patientPhone: "",
    patientEmail: "",
    symptoms: "",
    appointmentId: ""
  };

  function renderBookingStep() {
    // Stepper header
    const stepHeader = `
      <div class="step-progress-wrapper">
        <div class="step-item ${bookingState.step === 1 ? 'active' : (bookingState.step > 1 ? 'completed' : '')}">
          <span class="step-circle">${bookingState.step > 1 ? '<i class="bi bi-check-lg"></i>' : '1'}</span>
          <span>Date & Time</span>
        </div>
        <div class="step-divider-line"></div>
        <div class="step-item ${bookingState.step === 2 ? 'active' : (bookingState.step > 2 ? 'completed' : '')}">
          <span class="step-circle">${bookingState.step > 2 ? '<i class="bi bi-check-lg"></i>' : '2'}</span>
          <span>Patient Info</span>
        </div>
        <div class="step-divider-line"></div>
        <div class="step-item ${bookingState.step === 3 ? 'active' : ''}">
          <span class="step-circle">3</span>
          <span>Confirmation</span>
        </div>
      </div>
    `;

    let stepContent = "";

    // STEP 1: Select Date & Time (Page 5)
    if (bookingState.step === 1) {
      stepContent = `
        <div class="row g-4">
          <div class="col-lg-6">
            <div class="calendar-card">
              <div class="calendar-header">
                <span>Select Date</span>
                <span class="badge bg-primary-subtle text-primary">May 2026</span>
              </div>
              <div class="calendar-days-row">
                <div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div><div>S</div>
              </div>
              <div class="calendar-dates-grid" id="calendar-dates-wrapper">
                <button class="calendar-date-btn disabled">10</button>
                <button class="calendar-date-btn disabled">11</button>
                <button class="calendar-date-btn ${bookingState.selectedDate === '12 May 2026' ? 'active' : ''}" data-date="12 May 2026" data-day="Sunday">12</button>
                <button class="calendar-date-btn ${bookingState.selectedDate === '13 May 2026' ? 'active' : ''}" data-date="13 May 2026" data-day="Monday">13</button>
                <button class="calendar-date-btn ${bookingState.selectedDate === '14 May 2026' ? 'active' : ''}" data-date="14 May 2026" data-day="Tuesday">14</button>
                <button class="calendar-date-btn ${bookingState.selectedDate === '15 May 2026' ? 'active' : ''}" data-date="15 May 2026" data-day="Wednesday">15</button>
                <button class="calendar-date-btn ${bookingState.selectedDate === '16 May 2026' ? 'active' : ''}" data-date="16 May 2026" data-day="Thursday">16</button>
                <button class="calendar-date-btn ${bookingState.selectedDate === '17 May 2026' ? 'active' : ''}" data-date="17 May 2026" data-day="Friday">17</button>
                <button class="calendar-date-btn ${bookingState.selectedDate === '18 May 2026' ? 'active' : ''}" data-date="18 May 2026" data-day="Saturday">18</button>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="h-100 d-flex flex-column justify-content-between">
              <div>
                <h5 class="fw-bold mb-1">Available Time Slots</h5>
                <p class="text-muted small mb-3" id="active-selected-day-label">${bookingState.selectedDay}, ${bookingState.selectedDate}</p>
                <div class="time-slots-grid" id="time-slots-wrapper">
                  ${doctor.availableSlots.map(slot => `
                    <button class="time-slot-btn ${bookingState.selectedTimeSlot === slot ? 'active' : ''}" data-slot="${slot}">
                      ${slot}
                    </button>
                  `).join("")}
                </div>
              </div>

              <div class="mt-4 pt-3 border-top d-flex align-items-center justify-content-between">
                <div>
                  <div class="small text-muted">Consultation Fee</div>
                  <div class="fw-bold text-primary fs-5">${UI.formatCurrency(doctor.fee)}</div>
                </div>
                <button class="btn btn-primary-docfinder px-4" id="btn-goto-step-2">
                  Next Step: Patient Info <i class="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // STEP 2: Patient Information (Page 6)
    else if (bookingState.step === 2) {
      stepContent = `
        <form id="booking-patient-form">
          <div class="mb-4">
            <h5 class="fw-bold mb-1">Patient Information</h5>
            <p class="text-muted small">Please provide the patient details for appointment registration.</p>
          </div>

          <div class="row g-3">
            <div class="col-md-8">
              <label class="form-label-docfinder">Full Name <span class="text-danger">*</span></label>
              <input type="text" class="form-control form-control-docfinder" id="patient-name" required placeholder="e.g. Sarah Khan" value="${bookingState.patientName}">
            </div>
            <div class="col-md-4">
              <label class="form-label-docfinder">Age <span class="text-danger">*</span></label>
              <input type="number" min="1" max="120" class="form-control form-control-docfinder" id="patient-age" required placeholder="e.g. 28" value="${bookingState.patientAge}">
            </div>
            <div class="col-md-6">
              <label class="form-label-docfinder">Phone Number <span class="text-danger">*</span></label>
              <input type="tel" class="form-control form-control-docfinder" id="patient-phone" required placeholder="e.g. +880 1712 345678" value="${bookingState.patientPhone}">
            </div>
            <div class="col-md-6">
              <label class="form-label-docfinder">Email Address</label>
              <input type="email" class="form-control form-control-docfinder" id="patient-email" placeholder="e.g. sarah@example.com" value="${bookingState.patientEmail}">
            </div>
            <div class="col-12">
              <label class="form-label-docfinder">Reason for Visit (Symptoms)</label>
              <textarea rows="3" class="form-control form-control-docfinder" id="patient-symptoms" placeholder="Describe current physical issue, symptoms or purpose of checkup...">${bookingState.symptoms}</textarea>
            </div>
          </div>

          <div class="mt-4 pt-3 border-top d-flex align-items-center justify-content-between">
            <button type="button" class="btn btn-outline-secondary" id="btn-back-to-step-1">
              <i class="bi bi-arrow-left me-1"></i> Back
            </button>
            <button type="submit" class="btn btn-primary-docfinder px-4">
              Confirm & Book <i class="bi bi-check-circle ms-1"></i>
            </button>
          </div>
        </form>
      `;
    }

    // STEP 3: Confirmation Receipt (Page 7)
    else if (bookingState.step === 3) {
      stepContent = `
        <div class="confirmation-card">
          <div class="success-icon-circle">
            <i class="bi bi-check-lg"></i>
          </div>
          <h2 class="fw-bold text-dark mb-1">Appointment Confirmed!</h2>
          <p class="text-muted">We have sent a confirmation SMS to your phone <strong>${bookingState.patientPhone}</strong>.</p>

          <div class="confirmation-summary-receipt">
            <div class="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
              <div>
                <h5 class="fw-bold mb-1">${doctor.name}</h5>
                <span class="badge bg-primary-subtle text-primary">${doctor.specialty}</span>
              </div>
              <div class="text-end">
                <span class="text-muted small">Appointment Fee</span>
                <div class="fw-bold text-primary fs-5">${UI.formatCurrency(doctor.fee)}</div>
              </div>
            </div>

            <div class="row g-2 text-muted small">
              <div class="col-12">
                <i class="bi bi-calendar-event me-2 text-primary"></i> <strong>Date & Time:</strong> ${bookingState.selectedDate}, ${bookingState.selectedDay} | ${bookingState.selectedTimeSlot}
              </div>
              <div class="col-12">
                <i class="bi bi-hospital me-2 text-primary"></i> <strong>Chamber:</strong> ${doctor.chamber}, ${doctor.location}
              </div>
              <div class="col-12">
                <i class="bi bi-person me-2 text-primary"></i> <strong>Patient:</strong> ${bookingState.patientName} (${bookingState.patientAge} Yrs)
              </div>
              <div class="col-12">
                <i class="bi bi-upc-scan me-2 text-primary"></i> <strong>Booking Reference:</strong> <code>${bookingState.appointmentId}</code>
              </div>
            </div>
          </div>

          <div class="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <a href="dashboard.html?tab=appointments" class="btn btn-outline-docfinder px-4">
              <i class="bi bi-calendar2-check"></i> View My Appointments
            </a>
            <button class="btn btn-primary-docfinder px-4" id="btn-book-another">
              <i class="bi bi-plus-circle"></i> Book Another
            </button>
          </div>
        </div>
      `;
    }

    bookingCard.innerHTML = stepHeader + stepContent;
    attachBookingEventListeners();
  }

  function attachBookingEventListeners() {
    // Step 1 Listeners
    if (bookingState.step === 1) {
      const dateButtons = bookingCard.querySelectorAll(".calendar-date-btn:not(.disabled)");
      const dayLabel = document.getElementById("active-selected-day-label");
      dateButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          dateButtons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          bookingState.selectedDate = btn.getAttribute("data-date");
          bookingState.selectedDay = btn.getAttribute("data-day");
          if (dayLabel) dayLabel.textContent = `${bookingState.selectedDay}, ${bookingState.selectedDate}`;
        });
      });

      const slotButtons = bookingCard.querySelectorAll(".time-slot-btn");
      slotButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          slotButtons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          bookingState.selectedTimeSlot = btn.getAttribute("data-slot");
        });
      });

      const gotoStep2Btn = document.getElementById("btn-goto-step-2");
      if (gotoStep2Btn) {
        gotoStep2Btn.addEventListener("click", () => {
          bookingState.step = 2;
          renderBookingStep();
          bookingCard.scrollIntoView({ behavior: "smooth" });
        });
      }
    }

    // Step 2 Listeners
    else if (bookingState.step === 2) {
      const backBtn = document.getElementById("btn-back-to-step-1");
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          bookingState.step = 1;
          renderBookingStep();
        });
      }

      const patientForm = document.getElementById("booking-patient-form");
      if (patientForm) {
        patientForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const name = document.getElementById("patient-name").value.trim();
          const age = document.getElementById("patient-age").value.trim();
          const phone = document.getElementById("patient-phone").value.trim();
          const email = document.getElementById("patient-email")?.value.trim() || "";
          const symptoms = document.getElementById("patient-symptoms")?.value.trim() || "";

          if (!name || !age || !phone) {
            UI.showToast("Please fill in all required fields", "danger");
            return;
          }

          bookingState.patientName = name;
          bookingState.patientAge = age;
          bookingState.patientPhone = phone;
          bookingState.patientEmail = email;
          bookingState.symptoms = symptoms;
          bookingState.appointmentId = "APT-" + Math.floor(1000 + Math.random() * 9000);

          // Save Appointment in LocalStorage
          const newAppointment = {
            id: bookingState.appointmentId,
            doctorId: doctor.id,
            doctorName: doctor.name,
            specialty: doctor.specialty,
            chamber: doctor.chamber,
            location: doctor.location,
            date: bookingState.selectedDate,
            dayName: bookingState.selectedDay,
            timeSlot: bookingState.selectedTimeSlot,
            fee: doctor.fee,
            patientName: bookingState.patientName,
            patientAge: bookingState.patientAge,
            patientPhone: bookingState.patientPhone,
            symptoms: bookingState.symptoms,
            status: "Confirmed",
            createdAt: new Date().toISOString()
          };
          Storage.addAppointment(newAppointment);

          UI.showToast("Appointment confirmed successfully!", "success");
          bookingState.step = 3;
          renderBookingStep();
          bookingCard.scrollIntoView({ behavior: "smooth" });
        });
      }
    }

    // Step 3 Listeners
    else if (bookingState.step === 3) {
      const bookAnotherBtn = document.getElementById("btn-book-another");
      if (bookAnotherBtn) {
        bookAnotherBtn.addEventListener("click", () => {
          bookingState.step = 1;
          renderBookingStep();
        });
      }
    }
  }

  // Initial render of Step 1
  renderBookingStep();
}

// ==========================================================================
// 7. Page Controller: Dashboard (dashboard.html)
// ==========================================================================
function initDashboardPage() {
  const appointmentsContainer = document.getElementById("dashboard-appointments-tbody");
  if (!appointmentsContainer) return;

  // Render Stats
  const appointments = Storage.getAppointments();
  const savedDocIds = Storage.getFavorites();

  const totalAptEl = document.getElementById("stat-total-appointments");
  if (totalAptEl) totalAptEl.textContent = appointments.length;

  const upcomingAptEl = document.getElementById("stat-upcoming-appointments");
  const upcomingCount = appointments.filter(a => a.status === "Confirmed").length;
  if (upcomingAptEl) upcomingAptEl.textContent = upcomingCount;

  const savedCountEl = document.getElementById("stat-saved-doctors");
  if (savedCountEl) savedCountEl.textContent = savedDocIds.length;

  // Filter tabs for appointments
  let currentStatusFilter = "All";

  function renderAppointmentsTable() {
    let filtered = appointments;
    if (currentStatusFilter !== "All") {
      filtered = appointments.filter(a => a.status === currentStatusFilter);
    }

    if (filtered.length === 0) {
      appointmentsContainer.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            <i class="bi bi-calendar-x fs-3 d-block mb-2"></i>
            No ${currentStatusFilter.toLowerCase()} appointments found.
          </td>
        </tr>
      `;
      return;
    }

    appointmentsContainer.innerHTML = filtered.map(apt => {
      let badgeClass = "badge-status confirmed";
      let icon = "bi-check-circle";
      if (apt.status === "Pending") { badgeClass = "badge-status pending"; icon = "bi-hourglass-split"; }
      if (apt.status === "Cancelled") { badgeClass = "badge-status cancelled"; icon = "bi-x-circle"; }

      return `
        <tr>
          <td>
            <div class="fw-bold text-dark">${apt.doctorName}</div>
            <div class="text-muted small">${apt.specialty}</div>
          </td>
          <td>
            <div>${apt.date}</div>
            <div class="text-muted small">${apt.timeSlot}</div>
          </td>
          <td>
            <div class="small">${apt.chamber}</div>
          </td>
          <td>
            <div class="small fw-semibold">${apt.patientName}</div>
            <div class="text-muted small">${apt.patientPhone}</div>
          </td>
          <td>
            <span class="${badgeClass}">
              <i class="bi ${icon}"></i> ${apt.status}
            </span>
          </td>
          <td class="text-end">
            ${apt.status === 'Confirmed' ? `
              <button class="btn btn-sm btn-outline-danger btn-cancel-apt" data-id="${apt.id}">
                Cancel
              </button>
            ` : '<span class="text-muted small">-</span>'}
          </td>
        </tr>
      `;
    }).join("");

    // Attach cancel listeners
    appointmentsContainer.querySelectorAll(".btn-cancel-apt").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Are you sure you want to cancel this appointment?")) {
          Storage.cancelAppointment(id);
          UI.showToast("Appointment cancelled", "warning");
          // Re-fetch and re-render
          initDashboardPage();
        }
      });
    });
  }

  // Filter Buttons
  const filterBtns = document.querySelectorAll(".apt-status-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active", "btn-primary-docfinder"));
      filterBtns.forEach(b => b.classList.add("btn-light-docfinder"));
      btn.classList.add("active", "btn-primary-docfinder");
      btn.classList.remove("btn-light-docfinder");

      currentStatusFilter = btn.getAttribute("data-status");
      renderAppointmentsTable();
    });
  });

  renderAppointmentsTable();

  // Render Saved Doctors Grid in Dashboard
  const savedGrid = document.getElementById("dashboard-saved-doctors-grid");
  if (savedGrid) {
    const savedDocs = DOCFINDER_DATA.doctors.filter(d => savedDocIds.includes(d.id));
    if (savedDocs.length === 0) {
      savedGrid.innerHTML = `
        <div class="col-12">
          <div class="empty-state-box">
            <i class="bi bi-heart empty-state-icon"></i>
            <h5>No Saved Doctors Yet</h5>
            <p class="text-muted">Click the heart icon on any doctor card to bookmark them for easy booking.</p>
            <a href="doctors.html" class="btn btn-primary-docfinder">Browse Doctors</a>
          </div>
        </div>
      `;
    } else {
      savedGrid.innerHTML = savedDocs.map(d => `
        <div class="col-md-6 col-lg-4">
          <div class="card border p-3 h-100 shadow-sm" style="border-radius: var(--df-radius);">
            <div class="d-flex align-items-center gap-3 mb-3">
              <img src="${d.image}" alt="${d.name}" class="rounded-circle" style="width: 52px; height: 52px; object-fit: cover;">
              <div>
                <h6 class="fw-bold mb-0">${d.name}</h6>
                <div class="text-primary small">${d.specialty}</div>
                <div class="text-muted small">Fee: ${UI.formatCurrency(d.fee)}</div>
              </div>
            </div>
            <div class="mt-auto d-flex gap-2">
              <a href="doctor-details.html?id=${d.id}" class="btn btn-sm btn-primary-docfinder flex-grow-1">Book Now</a>
              <button class="btn btn-sm btn-outline-danger btn-bookmark active" data-doctor-id="${d.id}"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      `).join("");
      UI.initBookmarkButtons(savedGrid);
    }
  }

  // Sidebar Mobile Toggle
  const sidebarToggleBtn = document.getElementById("sidebar-toggle-btn");
  const dashboardSidebar = document.getElementById("dashboard-sidebar");
  if (sidebarToggleBtn && dashboardSidebar) {
    sidebarToggleBtn.addEventListener("click", () => {
      dashboardSidebar.classList.toggle("show");
    });
  }
}

// ==========================================================================
// 8. Page Controller: Authentication (login.html & register.html)
// ==========================================================================
function initAuthPages() {
  // Password Visibility Toggle
  const togglePassBtns = document.querySelectorAll(".password-toggle-btn");
  togglePassBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetInput = document.getElementById(btn.getAttribute("data-target"));
      if (targetInput) {
        const isPass = targetInput.type === "password";
        targetInput.type = isPass ? "text" : "password";
        btn.innerHTML = `<i class="bi ${isPass ? 'bi-eye-slash' : 'bi-eye'}"></i>`;
      }
    });
  });

  // Demo Login Quick Fill Button
  const demoFillBtn = document.getElementById("btn-demo-login");
  if (demoFillBtn) {
    demoFillBtn.addEventListener("click", () => {
      const emailInput = document.getElementById("login-email");
      const passInput = document.getElementById("login-password");
      if (emailInput) emailInput.value = "sarah.khan@example.com";
      if (passInput) passInput.value = "DoctorFinder2026!";
      UI.showToast("Demo credentials filled!", "info");
    });
  }

  // Login Form Submission
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim();
      const pass = document.getElementById("login-password").value.trim();

      if (!email || !pass) {
        UI.showToast("Please enter both email and password", "danger");
        return;
      }

      // Simulate Authentication
      const user = {
        name: email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        isLoggedIn: true
      };
      Storage.setUser(user);
      UI.showToast("Logged in successfully! Redirecting to Dashboard...", "success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 900);
    });
  }

  // Register Form Submission
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const phone = document.getElementById("reg-phone").value.trim();
      const pass = document.getElementById("reg-password").value;
      const confirmPass = document.getElementById("reg-confirm-password").value;
      const terms = document.getElementById("reg-terms")?.checked;

      if (!name || !email || !phone || !pass) {
        UI.showToast("Please fill in all required fields", "danger");
        return;
      }

      if (pass !== confirmPass) {
        UI.showToast("Passwords do not match!", "danger");
        return;
      }

      if (pass.length < 6) {
        UI.showToast("Password must be at least 6 characters", "warning");
        return;
      }

      if (!terms) {
        UI.showToast("Please agree to the Terms and Conditions", "warning");
        return;
      }

      // Save user
      const user = { name, email, phone, isLoggedIn: true };
      Storage.setUser(user);
      UI.showToast("Registration successful! Redirecting to Dashboard...", "success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 900);
    });
  }
}

// ==========================================================================
// 9. Application Initialization (DOM Ready)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  UI.renderNavbarAuth();

  // Route detection based on elements present
  if (document.getElementById("hero-search-form")) {
    initHomePage();
  }

  if (document.getElementById("doctors-results-list")) {
    initSearchAndDirectoryPage();
  }

  if (document.getElementById("doctor-profile-section")) {
    initDoctorDetailsPage();
  }

  if (document.getElementById("dashboard-appointments-tbody")) {
    initDashboardPage();
  }

  if (document.getElementById("login-form") || document.getElementById("register-form")) {
    initAuthPages();
  }
});
