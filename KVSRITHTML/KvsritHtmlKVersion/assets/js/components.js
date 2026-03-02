/**
 * KVSRIT Component Loader (Enhanced Navbar)
 * - Global Navbar + Footer injection on every page
 * - Mega-menu for Departments, Search overlay, Student Portal, Apply Now
 * - Works in root and nested directories via relative path adjustment
 * - Active route highlighting, sticky header with compact mode on scroll
 * - Basic keyboard accessibility for dropdowns and search overlay
 */

// Embedded Templates to avoid fetch/CORS issues when opened as file://
const NAVBAR_HTML = `
<!-- Top Bar -->
<div class="bg-blue-900 text-white py-2 text-xs hidden md:block">
  <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
    <div class="flex items-center gap-4">
      <span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> +91 91000 33333</span>
      <span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> office@drkvsrit.ac.in</span>
    </div>
    <div class="flex items-center gap-4">
      <a href="mandatory-disclosures/index.html" class="hover:text-blue-300">Mandatory Disclosures</a>
      <span class="text-gray-500">|</span>
      <a href="alumni/index.html" class="hover:text-blue-300">Alumni</a>
      <span class="text-gray-500">|</span>
      <a href="contact.html" class="hover:text-blue-300">Contact Us</a>
    </div>
  </div>
</div>

<!-- Main Navigation -->
<nav id="main-nav" class="bg-white sticky top-0 z-50 shadow-sm">
  <div class="w-full px-6 xl:px-12">
    <div id="nav-inner" class="flex items-center justify-between h-20">
      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center">
        <a href="index.html" class="flex items-center gap-3">
          <img src="images/logo.png" alt="KVSRIT Logo" class="h-12 md:h-14">
          <div class="hidden lg:block">
            <h1 class="text-lg font-bold text-blue-900 leading-tight">KVSRIT</h1>
            <p class="text-[10px] text-gray-500 font-medium uppercase tracking-tight">Dr. K.V. Subba Reddy Institute of Technology</p>
          </div>
        </a>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden xl:flex items-center ml-8 mr-auto space-x-1">
        <a href="index.html" class="px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 transition-colors">Home</a>

        <!-- About Dropdown -->
        <div class="relative group" data-dropdown>
          <button aria-haspopup="true" aria-expanded="false"
            class="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 group focus:outline-none">
            About Us <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div role="menu"
            class="absolute left-0 mt-0 w-64 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
            <div class="py-2">
              <a href="about.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">About Us</a>
              <a href="vision-mission-quality-policy/index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Vision & Mission</a>
              <a href="affiliation-and-accreditation/index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Affiliation and Accreditation</a>
              <a href="about.html#management" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Management</a>
              <a href="about.html#principal" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Principal</a>
              <a href="administration/index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Administration</a>
              <a href="leadership/index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Governing Body</a>
              <a href="academic-council/index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Academic Council</a>
              <a href="service-rules/index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Service Rules</a>
            </div>
          </div>
        </div>

        <!-- Admissions Dropdown -->
        <div class="relative group" data-dropdown>
          <button aria-haspopup="true" aria-expanded="false"
            class="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 group focus:outline-none">
            Admissions <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div role="menu"
            class="absolute left-0 mt-0 w-64 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
            <div class="py-2">
              <a href="admissions.html#procedure" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Admissions Procedure</a>
              <a href="admissions.html#criteria" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Criteria for Admission</a>
              <a href="admissions.html#programs" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Programs Offered</a>
              <a href="admissions.html#fee" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Fee Structure</a>
              <a href="admissions.html#scholarships" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Scholarships</a>
            </div>
          </div>
        </div>

        <!-- Academics Dropdown -->
        <div class="relative group" data-dropdown>
          <button aria-haspopup="true" aria-expanded="false"
            class="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 group focus:outline-none">
            Academics <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div role="menu"
            class="absolute left-0 mt-0 w-80 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
            <div class="py-2">
              <a href="academics/index.html#calendar" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Academic Calendar</a>
              <a href="academics/index.html#regulations" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Regulations and Syllabus</a>
              <a href="academics/index.html#exam-cell" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Exam Cell</a>
              <a href="research/index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Research & Development</a>
              <a href="iqac/index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">IQAC</a>
            </div>
          </div>
        </div>

        <!-- Departments Mega Menu -->
        <div class="relative group" data-dropdown>
          <button aria-haspopup="true" aria-expanded="false"
            class="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 group focus:outline-none">
            Departments <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div role="menu"
            class="absolute left-0 mt-0 w-[640px] bg-white border border-gray-100 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] p-4">
            <div class="grid grid-cols-2 gap-2">
              <a href="departments/cse/index.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50">
                <div class="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-blue-700"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg></div>
                <div>
                  <div class="text-sm font-semibold text-gray-800">Computer Science (CSE)</div>
                  <div class="text-[11px] text-gray-500">B.Tech</div>
                </div>
              </a>
              <a href="departments/ai/index.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50">
                <div class="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-violet-700"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg></div>
                <div>
                  <div class="text-sm font-semibold text-gray-800">CSE (AI & ML)</div>
                  <div class="text-[11px] text-gray-500">B.Tech</div>
                </div>
              </a>
              <a href="departments/ece/index.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50">
                <div class="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-amber-700"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg></div>
                <div>
                  <div class="text-sm font-semibold text-gray-800">Electronics (ECE)</div>
                  <div class="text-[11px] text-gray-500">B.Tech</div>
                </div>
              </a>
              <a href="departments/eee/index.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50">
                <div class="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-emerald-700"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
                <div>
                  <div class="text-sm font-semibold text-gray-800">Electrical (EEE)</div>
                  <div class="text-[11px] text-gray-500">B.Tech</div>
                </div>
              </a>
              <a href="departments/ce/index.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50">
                <div class="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-sky-700"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg></div>
                <div>
                  <div class="text-sm font-semibold text-gray-800">Civil (CE)</div>
                  <div class="text-[11px] text-gray-500">B.Tech</div>
                </div>
              </a>
              <a href="departments/me/index.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50">
                <div class="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-rose-700"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m11 13.73-4 6.93"/></svg></div>
                <div>
                  <div class="text-sm font-semibold text-gray-800">Mechanical (ME)</div>
                  <div class="text-[11px] text-gray-500">B.Tech</div>
                </div>
              </a>
              <a href="departments/ds/index.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50">
                <div class="w-9 h-9 rounded-lg bg-cyan-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-cyan-700"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg></div>
                <div>
                  <div class="text-sm font-semibold text-gray-800">CSE (DS)</div>
                  <div class="text-[11px] text-gray-500">B.Tech</div>
                </div>
              </a>
              <a href="departments/mba/index.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50">
                <div class="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-indigo-700"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
                <div>
                  <div class="text-sm font-semibold text-gray-800">Management (MBA/MCA)</div>
                  <div class="text-[11px] text-gray-500">PG</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Placements Dropdown -->
        <div class="relative group" data-dropdown>
          <button aria-haspopup="true" aria-expanded="false"
            class="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 group focus:outline-none">
            Placements <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div role="menu"
            class="absolute left-0 mt-0 w-64 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
            <div class="py-2">
              <a href="placements/index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">About T&P</a>
              <a href="placements/index.html#record" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Placement Record</a>
              <a href="placements/index.html#internships" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Internships</a>
              <a href="placements/index.html#news" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">News And Events</a>
            </div>
          </div>
        </div>

        <!-- Campus Life Dropdown -->
        <div class="relative group" data-dropdown>
          <button aria-haspopup="true" aria-expanded="false"
            class="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-gray-700 hover:text-blue-600 group focus:outline-none">
            Campus Life <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 group-hover:rotate-180 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div role="menu"
            class="absolute left-0 mt-0 w-64 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
            <div class="py-2">
              <a href="facilities/index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Facilities</a>
              <a href="campus-life/index.html#infrastructure" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Infrastructure</a>
              <a href="campus-life/index.html#events" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Events</a>
              <a href="gallery/index.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Gallery</a>
            </div>
          </div>
        </div>
        
        <!-- Right Actions (Student Portal & Search) inside the flex container -->
        <div class="flex items-center gap-3 pl-4">
             <a href="student-portal/index.html" class="px-4 py-1.5 h-9 inline-flex items-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 text-[13px] font-medium whitespace-nowrap">Student Portal</a>
            <button id="search-btn" aria-label="Search" class="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
        </div>
      </div>

      <!-- Action Buttons (Apply Now - Rightmost) -->
      <div class="hidden xl:flex items-center pl-4">
        <a href="admissions.html" class="bg-accent text-white px-5 py-2.5 rounded-full text-[13px] font-bold hover:bg-accent hover:shadow-lg transition-all whitespace-nowrap">Apply Now</a>
      </div>

      <!-- Mobile Menu Button -->
      <div class="xl:hidden flex items-center gap-2">
        <button id="search-btn-mobile" aria-label="Search" class="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
        <button id="mobile-menu-btn" class="p-2 text-gray-600 hover:text-blue-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" class="xl:hidden hidden bg-gray-50 border-t border-gray-100 pb-6 px-4">
    <div class="py-4 flex flex-col space-y-2">
      <a href="index.html" class="px-4 py-3 text-base font-semibold text-gray-700 hover:bg-blue-50 rounded-lg">Home</a>
      <a href="about.html" class="px-4 py-3 text-base font-semibold text-gray-700 hover:bg-blue-50 rounded-lg">About Us</a>
      <a href="admissions.html" class="px-4 py-3 text-base font-semibold text-gray-700 hover:bg-blue-50 rounded-lg">Admissions</a>
      <a href="departments/index.html" class="px-4 py-3 text-base font-semibold text-gray-700 hover:bg-blue-50 rounded-lg">Departments</a>
      <a href="placements/index.html" class="px-4 py-3 text-base font-semibold text-gray-700 hover:bg-blue-50 rounded-lg">Placements</a>
      <a href="student-portal/index.html" class="px-4 py-3 text-base font-semibold text-gray-700 hover:bg-blue-50 rounded-lg">Student Portal</a>
      <a href="admissions.html" class="mx-4 mt-2 bg-accent text-white px-6 py-3 rounded-xl text-center font-bold">Apply Now</a>
    </div>
  </div>
</nav>

<!-- Search Overlay -->
<div id="search-overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 z-[60]" style="display: none;">
  <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 mx-4">
    <div class="flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-500"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input id="search-input" type="text" placeholder="Search site..." class="w-full outline-none text-gray-900 placeholder-gray-400">
      <button id="search-close" class="p-2 rounded-lg text-gray-600 hover:bg-gray-100" aria-label="Close search"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M18 6 6 18"/><path d="m6 6 18 12"/></svg></button>
    </div>
    <div id="search-suggestions" class="mt-4 text-sm text-gray-500">Type to search pages like Admissions, Departments, Placements...</div>
  </div>
</div>
`;

const FOOTER_HTML = `
<footer class="bg-gray-900 text-gray-300 pt-20 pb-10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
      <!-- College Info -->
      <div class="space-y-6">
        <img src="images/logo.png" alt="KVSRIT Logo" class="h-16">
        <p class="text-sm leading-relaxed text-gray-400">
          Dr. K.V. Subba Reddy Institute of Technology (KVSRIT) is established in 2007 with a mission to produce high-quality engineering professionals.
        </p>
        <div class="flex space-x-4">
          <a href="coming-soon.html" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="coming-soon.html" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
          <a href="coming-soon.html" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
          <a href="coming-soon.html" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-800 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
        </div>
      </div>

        <!-- Quick Links -->
      <div>
        <h4 class="text-white font-bold text-lg mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-1 after:bg-blue-600">Quick Links</h4>
        <ul class="space-y-4 text-sm">
          <li><a href="about/index.html" class="hover:text-blue-500 transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-accent"><path d="m9 18 6-6-6-6"/></svg> About Us</a></li>
          <li><a href="admissions.html" class="hover:text-blue-500 transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-accent"><path d="m9 18 6-6-6-6"/></svg> Admissions</a></li>
          <li><a href="academics/index.html" class="hover:text-blue-500 transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-accent"><path d="m9 18 6-6-6-6"/></svg> Academics</a></li>
          <li><a href="placements/index.html" class="hover:text-blue-500 transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-accent"><path d="m9 18 6-6-6-6"/></svg> Placements</a></li>
          <li><a href="contact.html" class="hover:text-blue-500 transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-accent"><path d="m9 18 6-6-6-6"/></svg> Contact Us</a></li>
        </ul>
      </div>

      <!-- Academics -->
      <div>
        <h4 class="text-white font-bold text-lg mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-1 after:bg-blue-600">Academics</h4>
        <ul class="space-y-4 text-sm">
          <li><a href="courses/index.html" class="hover:text-blue-500 transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-accent"><path d="m9 18 6-6-6-6"/></svg> B.Tech Programs</a></li>
          <li><a href="courses/index.html" class="hover:text-blue-500 transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-accent"><path d="m9 18 6-6-6-6"/></svg> Post Graduation</a></li>
          <li><a href="exam-cell.html" class="hover:text-blue-500 transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-accent"><path d="m9 18 6-6-6-6"/></svg> Exam Cell</a></li>
          <li><a href="library/index.html" class="hover:text-blue-500 transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-accent"><path d="m9 18 6-6-6-6"/></svg> Library</a></li>
          <li><a href="facilities/index.html" class="hover:text-blue-500 transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 text-accent"><path d="m9 18 6-6-6-6"/></svg> Campus Facilities</a></li>
        </ul>
      </div>

      <!-- Get in Touch -->
      <div>
        <h4 class="text-white font-bold text-lg mb-8 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-12 after:h-1 after:bg-blue-600">Get In Touch</h4>
        <ul class="space-y-6 text-sm">
          <li class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-accent"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <p class="text-gray-400">Dupadu, NH-44, Kurnool, Andhra Pradesh - 518 218</p>
          </li>
          <li class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-accent"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
            <p class="text-gray-400">+91 91000 33333</p>
          </li>
          <li class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-accent"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
            <p class="text-gray-400">office@drkvsrit.ac.in</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-xs text-gray-500">© ${new Date().getFullYear()} Dr. K.V. Subba Reddy Institute of Technology. All rights reserved.</p>
      <div class="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-gray-600">
        <a href="coming-soon.html" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="coming-soon.html" class="hover:text-white transition-colors">Terms of Use</a>
        <a href="coming-soon.html" class="hover:text-white transition-colors">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
`;

// Inject components on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Determine rootPath for nested routes
  // Determine rootPath for nested routes
  // Prioritize global rootPath if set (for static file deployments)
  // Determine rootPath for nested routes
  const rootPath = window.rootPath !== undefined ? window.rootPath : (
    (() => {
      const path = window.location.pathname;
      // For file:// support on windows, normalize slashes and remove drive letter if present
      const normalizedPath = path.replace(/\\/g, '/').replace(/^[A-Z]:/i, '');
      const segments = normalizedPath.split('/').filter(s => s.length > 0);

      // If the path ends with .html, the last segment is the file.
      // We need to count segments *before* the file.
      // E.g., /project/about/index.html -> [project, about, index.html]
      // We need to know how many steps to get back to the root (where index.html is)

      // Find the project root index. We assume 'kvsrithtml' is a root-level marker or calculate based on depth.
      // A better way: check if we are in a known nested structure.
      const isDept = /\/departments\//.test(normalizedPath);
      const isAbout = /\/about\//.test(normalizedPath);
      const isAcademics = /\/academics\//.test(normalizedPath);
      const isCampus = /\/campus-life\//.test(normalizedPath);
      const isPlacements = /\/placements\//.test(normalizedPath);
      const isStudentPortal = /\/student-portal\//.test(normalizedPath);

      const isCourses = /\/courses\//.test(normalizedPath);
      const isVisionMission = /\/vision-mission-quality-policy\//.test(normalizedPath);
      const isAffiliation = /\/affiliation-and-accreditation\//.test(normalizedPath);
      const isAdministration = /\/administration\//.test(normalizedPath);
      const isAcademicCouncil = /\/academic-council\//.test(normalizedPath);

      // Multi-level nesting check (e.g. departments/cse/index.html)
      const deptMatch = normalizedPath.match(/\/departments\/([^\/]+)\//);
      if (deptMatch) return '../../';

      if (isDept || isAbout || isAcademics || isCampus || isPlacements || isStudentPortal || isCourses || isVisionMission || isAffiliation || isAdministration || isAcademicCouncil) {
        return '../';
      }
      return './';
    })()
  );

  // ── PERFORMANCE: Consolidate Google Fonts loading ────────────────────
  // Multiple pages include duplicate <link> tags for Google Fonts.
  // We consolidate them into a single non-render-blocking request.
  (function optimizeGoogleFonts() {
    if (document.head.dataset.fontsOptimized) return;

    // Collect all unique font families requested
    const fontFamilies = new Set();
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      // Extract family param: family=Inter:wght@300;400...
      const match = href.match(/family=([^&]+)/g);
      if (match) match.forEach(f => fontFamilies.add(f.replace('family=', '')));
      link.remove(); // Remove the individual link
    });

    if (fontFamilies.size > 0) {
      // Add preconnect hints (speeds up DNS + TLS handshake)
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      document.head.insertBefore(preconnect1, document.head.firstChild);

      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      document.head.insertBefore(preconnect2, preconnect1.nextSibling);

      // Build single combined URL
      const families = Array.from(fontFamilies).map(f => 'family=' + f).join('&');
      const combinedUrl = 'https://fonts.googleapis.com/css2?' + families + '&display=swap';

      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = combinedUrl;
      // Use media="print" trick for non-render-blocking, then swap on load
      linkEl.media = 'print';
      linkEl.onload = function () { this.media = 'all'; };
      document.head.appendChild(linkEl);

      // Fallback: if onload doesn't fire, force after 3s
      setTimeout(() => { linkEl.media = 'all'; }, 3000);
    }

    document.head.dataset.fontsOptimized = 'true';
  })();

  // ── AUTO-INJECT responsive.css on EVERY page ──────────────────────────
  // Many pages have WRONG paths for responsive.css (e.g. ../../../css/responsive.css)
  // which silently 404. We remove any broken links and inject the correct one.
  (function injectResponsiveCSS() {
    if (document.head.dataset.responsiveInjected) return; // prevent double-inject
    // Remove any existing responsive.css links (they may have wrong paths)
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      if (link.getAttribute('href') && link.getAttribute('href').includes('responsive.css')) {
        link.remove();
      }
    });
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = rootPath + 'css/responsive.css';
    document.head.appendChild(linkEl);
    document.head.dataset.responsiveInjected = 'true';
  })();

  // ── AUTO-INJECT navbar-enhanced.css on EVERY page ─────────────────────
  (function injectNavbarCSS() {
    if (document.head.dataset.navbarCssInjected) return;
    const alreadyLoaded = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .some(link => {
        const href = link.getAttribute('href') || '';
        // Only consider it loaded if the path looks correct (starts with rootPath)
        return href === rootPath + 'css/navbar-enhanced.css' ||
          href === 'css/navbar-enhanced.css' ||
          href === '../css/navbar-enhanced.css' ||
          href === '../../css/navbar-enhanced.css';
      });
    if (!alreadyLoaded) {
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href = rootPath + 'css/navbar-enhanced.css';
      document.head.appendChild(linkEl);
    }
    document.head.dataset.navbarCssInjected = 'true';
  })();

  const navPlaceholder = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  // SAFEGUARD: Prevent duplicate navbar injection
  if (navPlaceholder && navPlaceholder.hasAttribute('data-navbar-loaded')) {
    console.log('Navbar already loaded, skipping injection');
    return;
  }

  if (navPlaceholder) {
    navPlaceholder.setAttribute('data-navbar-loaded', 'true');
    navPlaceholder.innerHTML = NAVBAR_HTML;
    adjustLinks(navPlaceholder, rootPath);
    initMobileMenu();
    highlightActive(navPlaceholder, rootPath);
    initSearchOverlay();
    initDropdownA11y();

    // Ensure consistent navbar height (only the inner bar, NOT the whole nav)
    // NOTE: Do NOT set maxHeight on #main-nav or it will clip the mobile menu dropdown
    const mainNav = document.getElementById('main-nav');
    if (mainNav) {
      mainNav.style.minHeight = '80px';
      // maxHeight removed — it was clipping the mobile dropdown menu
    }
  }

  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = FOOTER_HTML;
    adjustLinks(footerPlaceholder, rootPath);
  }



  // Header Scroll Effect
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
});

// Adjust internal links and images for nested pages
function adjustLinks(container, rootPath) {
  if (rootPath === './') return;

  container.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
    link.setAttribute('href', rootPath + href);
  });

  container.querySelectorAll('img[src]').forEach(img => {
    const src = img.getAttribute('src');
    if (!src) return;
    if (src.startsWith('http')) return;
    img.setAttribute('src', rootPath + src);
  });
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const isHidden = menu.classList.toggle('hidden');

      // Update ARIA attributes for accessibility
      btn.setAttribute('aria-expanded', !isHidden);
      btn.setAttribute('aria-label', isHidden ? 'Open menu' : 'Close menu');

      if (!isHidden) {
        // Staggered animation for mobile items
        const links = menu.querySelectorAll('a');
        links.forEach((link, idx) => {
          link.style.opacity = '0';
          link.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            link.style.transition = 'opacity 300ms ease, transform 300ms ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
          }, 50 + (idx * 40));
        });
      }
    });
  }
}

function highlightActive(container, rootPath) {
  const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  container.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const target = href.replace(rootPath, '').toLowerCase();
    if (current === target || (current === 'index.html' && (target === '' || target.endsWith('index.html')))) {
      a.classList.add('text-blue-600');
    }
  });
}


function initSearchOverlay() {
  const overlay = document.getElementById('search-overlay');
  const openBtns = [document.getElementById('search-btn'), document.getElementById('search-btn-mobile')].filter(Boolean);
  const closeBtn = document.getElementById('search-close');
  const input = document.getElementById('search-input');

  const open = () => {
    if (!overlay) return;
    overlay.style.display = 'flex';
    setTimeout(() => input && input.focus(), 0);
  };
  const close = () => {
    if (overlay) overlay.style.display = 'none';
  };

  openBtns.forEach(b => b.addEventListener('click', open));
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

function initDropdownA11y() {
  const dropdowns = document.querySelectorAll('[data-dropdown] > button');
  dropdowns.forEach(btn => {
    const parent = btn.parentElement;
    const menu = parent && parent.querySelector('[role="menu"]');
    if (!menu) return;

    // Toggle aria-expanded on focus/keyboard
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (!expanded) menu.classList.remove('invisible', 'opacity-0');
      } else if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.add('invisible', 'opacity-0');
        btn.blur();
      }
    });

    // Close when leaving dropdown area via keyboard
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.add('invisible', 'opacity-0');
        btn.focus();
      }
    });
  });
}
