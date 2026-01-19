const projects = [
  {
    id: 'project-network-lab.html',
    title: 'Enterprise Network Security & Pentesting Lab',
    tag: 'SOC',
    summary: 'Segmented enterprise lab for attack/defense simulation with centralized Wazuh logging.',
    technologies: ['Virtualization', 'Windows Server', 'Suricata', 'Wazuh', 'Nginx', 'pfSense', 'Docker', 'Active Directory'],
    filters: ['SOC', 'OT'],
  },
  {
    id: 'project-cloud-ml.html',
    title: 'Cloud Threat Detection using Machine Learning',
    tag: 'Cloud',
    summary: 'Anomaly detection model built with Random Forest achieving ~80% accuracy.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
    filters: ['Cloud', 'ML'],
  },
  {
    id: 'project-ids-ml.html',
    title: 'Intrusion Detection System with Machine Learning',
    tag: 'ML',
    summary: 'End-to-end IDS with Streamlit dashboard and dimensionality reduction.',
    technologies: ['Python', 'Scikit-learn', 'Streamlit'],
    filters: ['SOC', 'ML'],
  },
  {
    id: 'project-wazuh-streamlit.html',
    title: 'Cybersecurity Data Analysis with Wazuh + Streamlit + ML',
    tag: 'SOC',
    summary: 'SOC-style dashboard with Wazuh alerting and ML anomaly detection.',
    technologies: ['Atomic Red Labs', 'Wazuh', 'Python', 'Streamlit', 'Scikit-learn'],
    filters: ['SOC', 'ML'],
  },
  {
    id: 'project-ot-deception.html',
    title: 'OT / SCADA Cyber Deception (Case Study)',
    tag: 'OT',
    summary: 'Defensive deception architecture aligned with Purdue model and IEC 62443.',
    technologies: ['Honeypots', 'Wazuh', 'Suricata', 'OpenCTI'],
    filters: ['OT', 'SOC'],
  },
];

const projectGrid = document.querySelector('[data-project-grid]');
const searchInput = document.querySelector('[data-project-search]');
const filterButtons = document.querySelectorAll('[data-filter]');
let activeFilter = 'All';

const renderProjects = () => {
  if (!projectGrid) return;
  const query = searchInput?.value.toLowerCase() || '';
  projectGrid.innerHTML = '';
  const filtered = projects.filter((project) => {
    const matchesFilter = activeFilter === 'All' || project.filters.includes(activeFilter);
    const matchesSearch = project.title.toLowerCase().includes(query) || project.summary.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    projectGrid.innerHTML = '<p class="muted">No projects found. Try another keyword.</p>';
    return;
  }

  filtered.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="tag">${project.tag}</div>
      <h3>${project.title}</h3>
      <p class="muted">${project.summary}</p>
      <div class="badge">${project.technologies.slice(0, 3).join(' • ')}</div>
      <a class="btn" href="${project.id}">Open Case Study</a>
    `;
    projectGrid.appendChild(card);
  });
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderProjects();
  });
});

searchInput?.addEventListener('input', renderProjects);

renderProjects();
