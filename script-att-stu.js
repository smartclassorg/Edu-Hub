// Dummy class data
        const classData = [
            {
                id: 1,
                time: "09:00 - 10:30",
                course: "Advanced Mathematics",
                room: "Room 201",
                instructor: "Dr. Sarah Johnson",
                status: "attended"
            },
            {
                id: 2,
                time: "10:45 - 12:15",
                course: "Computer Science",
                room: "Lab 105",
                instructor: "Prof. Michael Chen",
                status: "attended"
            },
            {
                id: 3,
                time: "13:00 - 14:30",
                course: "Physics Laboratory",
                room: "Lab 302",
                instructor: "Dr. Emily Rodriguez",
                status: "absent"
            },
            {
                id: 4,
                time: "14:45 - 16:15",
                course: "English Literature",
                room: "Room 150",
                instructor: "Ms. Jennifer Wilson",
                status: "attended"
            },
            {
                id: 5,
                time: "16:30 - 18:00",
                course: "Chemistry",
                room: "Lab 204",
                instructor: "Dr. Robert Brown",
                status: "upcoming"
            },
            {
                id: 6,
                time: "18:15 - 19:45",
                course: "History",
                room: "Room 301",
                instructor: "Prof. Lisa Davis",
                status: "upcoming"
            }
        ];

        let activeClassId = null;

        // Initialize the page
        function init() {
            renderClassesTimeline();
            renderAttendanceBar();
            renderAttendanceStats();
        }

        // Render classes timeline
        function renderClassesTimeline() {
            const timeline = document.getElementById('classesTimeline');
            timeline.innerHTML = '';

            classData.forEach(classItem => {
                const block = document.createElement('div');
                block.className = 'class-block';
                block.onclick = () => showClassDetails(classItem.id);

                block.innerHTML = `
                    <div class="class-time ${classItem.status}">${classItem.time}</div>
                    <div class="class-name">${classItem.course}</div>
                    <div class="class-room">${classItem.room}</div>
                `;

                timeline.appendChild(block);
            });
        }

        // Render attendance bar
        function renderAttendanceBar() {
            const bar = document.getElementById('attendanceBar');
            bar.innerHTML = '';

            classData.forEach((classItem, index) => {
                const segment = document.createElement('div');
                segment.className = `attendance-segment segment-${classItem.status}`;
                segment.textContent = index + 1;
                segment.title = `${classItem.course} - ${classItem.status}`;
                bar.appendChild(segment);
            });
        }

        // Render attendance stats
        function renderAttendanceStats() {
            const stats = document.getElementById('attendanceStats');
            const attended = classData.filter(c => c.status === 'attended').length;
            const total = classData.filter(c => c.status !== 'upcoming').length;
            const punctuality = Math.round((attended / total) * 100) || 0;

            stats.innerHTML = `
                <div class="stat-item">
                    <div class="stat-number">${attended}/${classData.length}</div>
                    <div class="stat-label">Hours Attended</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${punctuality}%</div>
                    <div class="stat-label">Punctuality Score</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${classData.filter(c => c.status === 'upcoming').length}</div>
                    <div class="stat-label">Upcoming Classes</div>
                </div>
            `;
        }

        // Show class details
        function showClassDetails(classId) {
            const classItem = classData.find(c => c.id === classId);
            if (!classItem) return;

            // Update active class
            document.querySelectorAll('.class-block').forEach((block, index) => {
                block.classList.toggle('active', classData[index].id === classId);
            });

            activeClassId = classId;

            const details = document.getElementById('classDetails');
            const statusClass = `status-${classItem.status === 'attended' ? 'present' : classItem.status}`;
            const statusText = classItem.status === 'attended' ? 'Present' : 
                             classItem.status === 'absent' ? 'Absent' : 'Upcoming';

            let actions = '';
            if (classItem.status === 'attended' || classItem.status === 'absent') {
                actions = `
                    <button class="btn btn-primary" onclick="showAISummary('${classItem.course}')">
                        AI Summary
                    </button>
                    <button class="btn btn-secondary" onclick="downloadLecture('${classItem.course}')">
                        Download Lecture
                    </button>
                `;
            }
            // Upcoming classes now have no action buttons

            details.innerHTML = `
                <div class="class-header">
                    <div class="class-info">
                        <h3>${classItem.course}</h3>
                        <div class="class-meta">📅 ${classItem.time}</div>
                        <div class="class-meta">👨‍🏫 ${classItem.instructor}</div>
                        <div class="class-meta">📍 ${classItem.room}</div>
                    </div>
                    <div class="status-badge ${statusClass}">
                        ${statusText}
                    </div>
                </div>
                <div class="class-actions">
                    ${actions}
                </div>
            `;

            details.classList.add('show');
        }

        // Action functions
        function showAISummary(course) {
            alert(`Showing AI Summary for ${course}.\n\nThis would display an AI-generated summary of the lecture content, key points, and important takeaways.`);
        }

        function downloadLecture(course) {
            alert(`Downloading lecture materials for ${course}.\n\nThis would initiate a download of lecture slides, recordings, and supplementary materials.`);
        }

        function markAttendance(classId) {
            const classItem = classData.find(c => c.id === classId);
            if (classItem) {
                classItem.status = 'attended';
                alert(`Attendance marked for ${classItem.course}!\n\nYou have been marked as present for this class.`);
                
                // Refresh the UI
                renderClassesTimeline();
                renderAttendanceBar();
                renderAttendanceStats();
                showClassDetails(classId);
            }
        }

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

        function enableSmartboard(course) {
            alert(`Enabling Smartboard Mirroring for ${course}.\n\nThis would connect your device to the classroom smartboard for screen sharing and interactive participation.`);
        }

        // Initialize the page when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);