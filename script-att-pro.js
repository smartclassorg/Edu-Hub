// Sample data for today's classes
        const classesData = [
            {
                id: 1,
                time: "09:00 AM",
                course: "Computer Science 101",
                room: "Room A-201",
                presentStudents: [
                    { name: "Alice Johnson", id: "CS001" },
                    { name: "Bob Smith", id: "CS002" },
                    { name: "Carol Davis", id: "CS003" },
                    { name: "David Wilson", id: "CS004" },
                    { name: "Emma Brown", id: "CS005" }
                ],
                absentStudents: [
                    { name: "Frank Miller", id: "CS006" },
                    { name: "Grace Lee", id: "CS007" }
                ]
            },
            {
                id: 2,
                time: "11:00 AM",
                course: "Data Structures",
                room: "Room B-105",
                presentStudents: [
                    { name: "Henry Taylor", id: "DS001" },
                    { name: "Ivy Chen", id: "DS002" },
                    { name: "Jack Robinson", id: "DS003" },
                    { name: "Kate Anderson", id: "DS004" }
                ],
                absentStudents: [
                    { name: "Liam Garcia", id: "DS005" },
                    { name: "Mia Martinez", id: "DS006" },
                    { name: "Noah Thompson", id: "DS007" }
                ]
            },
            {
                id: 3,
                time: "02:00 PM",
                course: "Web Development",
                room: "Room C-301",
                presentStudents: [
                    { name: "Olivia White", id: "WD001" },
                    { name: "Peter Harris", id: "WD002" },
                    { name: "Quinn Clark", id: "WD003" },
                    { name: "Rachel Lewis", id: "WD004" },
                    { name: "Sam Walker", id: "WD005" },
                    { name: "Tina Hall", id: "WD006" }
                ],
                absentStudents: [
                    { name: "Uma Young", id: "WD007" }
                ]
            },
            {
                id: 4,
                time: "04:00 PM",
                course: "Database Systems",
                room: "Room D-202",
                presentStudents: [
                    { name: "Victor King", id: "DB001" },
                    { name: "Wendy Scott", id: "DB002" },
                    { name: "Xavier Green", id: "DB003" }
                ],
                absentStudents: [
                    { name: "Yara Adams", id: "DB004" },
                    { name: "Zoe Baker", id: "DB005" },
                    { name: "Alex Cooper", id: "DB006" },
                    { name: "Blake Turner", id: "DB007" }
                ]
            }
        ];

        // DOM elements
        const timelineBlocks = document.getElementById('timelineBlocks');
        const expandedDetail = document.getElementById('expandedDetail');
        const closeBtn = document.getElementById('closeBtn');
        const detailTitle = document.getElementById('detailTitle');
        const presentCount = document.getElementById('presentCount');
        const absentCount = document.getElementById('absentCount');
        const attendanceRate = document.getElementById('attendanceRate');
        const presentList = document.getElementById('presentList');
        const absentList = document.getElementById('absentList');
        const presentHeader = document.getElementById('presentHeader');
        const absentHeader = document.getElementById('absentHeader');
        const ratioFill = document.getElementById('ratioFill');
        const presentTotal = document.getElementById('presentTotal');
        const absentTotal = document.getElementById('absentTotal');

        // Initialize the page
        function init() {
            renderTimelineBlocks();
            updateOverallAttendance();
        }

        // Render timeline blocks
        function renderTimelineBlocks() {
            timelineBlocks.innerHTML = '';
            classesData.forEach(classData => {
                const block = document.createElement('div');
                block.className = 'timeline-block';
                block.innerHTML = `
                    <div class="block-time">${classData.time}</div>
                    <div class="block-course">${classData.course}</div>
                    <div class="block-room">${classData.room}</div>
                `;
                block.addEventListener('click', () => showClassDetails(classData));
                timelineBlocks.appendChild(block);
            });
        }

        // Show class details in expanded view
        function showClassDetails(classData) {
            // Update active state
            document.querySelectorAll('.timeline-block').forEach(block => {
                block.classList.remove('active');
            });
            event.currentTarget.classList.add('active');

            // Populate detail view
            detailTitle.textContent = `${classData.course} - ${classData.time}`;
            presentCount.textContent = classData.presentStudents.length;
            absentCount.textContent = classData.absentStudents.length;
            
            const total = classData.presentStudents.length + classData.absentStudents.length;
            const rate = total > 0 ? Math.round((classData.presentStudents.length / total) * 100) : 0;
            attendanceRate.textContent = `${rate}%`;

            // Populate student lists
            populateStudentList(presentList, classData.presentStudents);
            populateStudentList(absentList, classData.absentStudents);

            // Show expanded detail
            expandedDetail.classList.add('show');
            expandedDetail.scrollIntoView({ behavior: 'smooth' });
        }

        // Populate student list
        function populateStudentList(container, students) {
            container.innerHTML = '';
            students.forEach(student => {
                const item = document.createElement('div');
                item.className = 'student-item';
                const initials = student.name.split(' ').map(n => n[0]).join('');
                item.innerHTML = `
                    <div class="student-avatar">${initials}</div>
                    <span>${student.name}</span>
                `;
                container.appendChild(item);
            });
        }

        // Update overall attendance ratio
        function updateOverallAttendance() {
            let totalPresent = 0;
            let totalAbsent = 0;

            classesData.forEach(classData => {
                totalPresent += classData.presentStudents.length;
                totalAbsent += classData.absentStudents.length;
            });

            const total = totalPresent + totalAbsent;
            const percentage = total > 0 ? (totalPresent / total) * 100 : 0;

            ratioFill.style.width = `${percentage}%`;
            presentTotal.textContent = `Present: ${totalPresent}`;
            absentTotal.textContent = `Absent: ${totalAbsent}`;
        }

        // Close expanded detail
        closeBtn.addEventListener('click', () => {
            expandedDetail.classList.remove('show');
            document.querySelectorAll('.timeline-block').forEach(block => {
                block.classList.remove('active');
            });
        });

        // Enable dark mode when dark-mode-switch is toggled
        const darkModeToggle = document.getElementById('darkModeToggle');
        const htmlEl = document.documentElement;

        // Load dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            darkModeToggle.checked = true;
            htmlEl.classList.add('dark');
        } else {
            darkModeToggle.checked = false;
            htmlEl.classList.remove('dark');
        }

        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                htmlEl.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
            } else {
                htmlEl.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
            }
        });

        // Toggle collapsible lists
        presentHeader.addEventListener('click', () => {
            const content = presentList;
            const icon = presentHeader.querySelector('i');
            content.classList.toggle('open');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });

        absentHeader.addEventListener('click', () => {
            const content = absentList;
            const icon = absentHeader.querySelector('i');
            content.classList.toggle('open');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });

        // Initialize the application
        init();