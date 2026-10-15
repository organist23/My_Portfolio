// Centralized project data
// Automatically detects and bundles screenshots placed in src/assets/projects/<project-id>/

const projectImageModules = import.meta.glob(
  '/src/assets/projects/**/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, query: '?url', import: 'default' }
);

function getImagesForProject(projectId) {
  const prefix = `/src/assets/projects/${projectId}/`;
  return Object.entries(projectImageModules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, url]) => {
      const fileName = path.split('/').pop().replace(/\.[^/.]+$/, '');
      const caption = fileName
        .split(/[-_]/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return {
        url,
        caption,
      };
    });
}

const rawProjects = [
  {
    id: "employee-leave",
    title: "Employee Leave Record Management System",
    organization: "HRMO – LGU Dupax Del Norte",
    year: "2026",
    category: "Record Management System",
    description:
      "A digital employee leave management system developed to replace paper-based leave tracking and simplify employee leave record management.",
    problem:
      "Traditional paper-based leave records required manual tracking and calculations, making recordkeeping time-consuming and increasing the possibility of calculation errors.",
    solution:
      "Developed a digital system that centralizes employee leave records, automates leave-credit calculations, and provides searchable and printable leave histories.",
    features: [
      "Digital employee leave records",
      "Automated leave-credit calculations",
      "Searchable employee records",
      "Leave history",
      "Printable leave report cards",
      "Centralized record management",
    ],
    impact:
      "Reduced manual recordkeeping and calculation work while making employee leave information easier to search and manage.",
    technologies: [],
    images: [],
    githubUrl: "https://github.com/organist23/ELRMS_Final.git",
    liveUrl: null,
    status: "Private / OJT Project",
  },
  {
    id: "senior-citizen",
    title: "Senior Citizen Records Management System",
    organization: "HRMO – LGU Dupax Del Norte",
    year: "2026",
    category: "Record Management System",
    description:
      "A centralized digital record management system designed to replace manual paper-based senior citizen records.",
    problem:
      "Paper-based records made searching, accessing, and managing senior citizen information slower and more difficult.",
    solution:
      "Developed a centralized digital system that organizes senior citizen information and provides faster access to records.",
    features: [
      "Digital senior citizen records",
      "Searchable records",
      "Record management",
      "Centralized information",
      "Easy access to records",
      "Printable reports",
    ],
    impact:
      "Improved access to senior citizen information and reduced dependence on manual paper-based recordkeeping.",
    technologies: [],
    images: [],
    githubUrl: "",
    liveUrl: null,
    status: "Private / OJT Project",
  },
  {
    id: "pwd",
    title: "PWD Records Management System",
    organization: "HRMO – LGU Dupax Del Norte",
    year: "2026",
    category: "Data Management & Analytics",
    description:
      "A digital PWD records management system designed to organize records and provide data analysis for easier monitoring and reporting.",
    problem:
      "Manual filtering and counting made it difficult to quickly analyze PWD records by barangay and disability type.",
    solution:
      "Developed a digital system that organizes PWD records and provides filtering, analysis, and reporting capabilities.",
    features: [
      "Digital PWD records",
      "Barangay filtering",
      "Disability-type filtering",
      "Data analysis dashboard",
      "Easy record access",
      "Printable reports",
    ],
    impact:
      "Simplified record filtering and counting while providing a clearer view of PWD data through an interactive dashboard.",
    technologies: [],
    images: [],
    githubUrl: null,
    liveUrl: null,
    status: "Private / OJT Project",
  },
  {
    id: "faculty-compliance",
    title: "Faculty Compliance Checklist Management System",
    organization: "NVSU BPED Office",
    year: "2026",
    category: "Compliance Management System",
    description:
      "A digital faculty compliance monitoring system developed to organize accomplishment tracking, submission deadlines, faculty activities, and report submissions.",
    problem:
      "Manual compliance monitoring made it difficult to maintain visibility of faculty accomplishments, deadlines, and report submissions.",
    solution:
      "Developed a digital checklist system that centralizes faculty compliance information and improves monitoring of submissions and activities.",
    features: [
      "Faculty compliance checklist",
      "Accomplishment tracking",
      "Submission deadline monitoring",
      "Faculty activity monitoring",
      "Report submission monitoring",
      "Digital record management",
    ],
    impact:
      "Improved visibility and organization of faculty compliance activities and report submissions.",
    technologies: [],
    images: [],
    githubUrl: "https://github.com/organist23/faculty_checklist.git",
    liveUrl: null,
    status: "Private / OJT Project",
  },
];

// Export projects with auto-detected screenshots if images array is empty
export const projects = rawProjects.map((p) => {
  const autoDetected = getImagesForProject(p.id);
  return {
    ...p,
    images: p.images && p.images.length > 0 ? p.images : autoDetected,
  };
});
