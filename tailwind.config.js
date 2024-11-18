function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      textColor: {
        nav: {
          base: withOpacity("--color-nav-text-base"),
          light: withOpacity("--color-nav-text-light"),
          dark: withOpacity("--color-nav-text-dark"),
          svg: {
            light: withOpacity("--color-nav-svg-text-light"),
            dark: withOpacity("--color-nav-svg-text-dark"),
          },
        },
        header: {
          primary: withOpacity("--color-header-text-primary"),
          light: withOpacity("--color-header-text-light"),
          dark: withOpacity("--color-header-text-dark"),
          "hover-light": withOpacity("--color-header-text-hover-light"),
        },
        dashboard: {
          stats: {
            primary: withOpacity("--color-dashboard-stats-text-primary"),
            secondary: withOpacity(
              "--color-dashboard-stats-text-secondary"
            ),
            success: withOpacity("--color-dashboard-stats-text-success"),
            danger: withOpacity("--color-dashboard-stats-text-danger"),
            info: withOpacity("--color-dashboard-stats-text-info"),
          },
        },
      },
      backgroundColor: {
        nav: {
          base: withOpacity("--color-nav-bg-base"),
          light: withOpacity("--color-nav-bg-light"),
          dark: withOpacity("--color-nav-bg-dark"),
        },
        header: {
          base: withOpacity("--color-header-bg-base"),
          "hover-btn": withOpacity("--color-header-bg-hover-btn"),
        },
        dashboard: {
          stats: {
            primary: {
              light: withOpacity(
                "--color-dashboard-stats-primary-bg-light"
              ),
              dark: withOpacity(
                "--color-dashboard-stats-primary-bg-dark"
              ),
            },
            secondary: {
              light: withOpacity(
                "--color-dashboard-stats-secondary-bg-light"
              ),
              dark: withOpacity(
                "--color-dashboard-stats-secondary-bg-dark"
              ),
            },
            success: {
              light: withOpacity(
                "--color-dashboard-stats-success-bg-light"
              ),
              dark: withOpacity(
                "--color-dashboard-stats-success-bg-dark"
              ),
            },
            danger: {
              light: withOpacity(
                "--color-dashboard-stats-danger-bg-light"
              ),
              dark: withOpacity("--color-dashboard-stats-danger-bg-dark"),
            },
          },
        },
        main: {
          imageplaceholder: withOpacity(
            "--color-main-imageplaceholder-bg-imageplaceholder"
          ),
        },
      },
      borderColor: {
        DEFAULT: withOpacity("--color-border-default"),
      },
      colors: {
        container: {
          base: withOpacity("--color-container-base"),
        },
        nav: {
          base: withOpacity("--color-nav-border-base"),
        },
        header: {
          primary: withOpacity("--color-header-border-primary"),
          "hover-light": withOpacity("--color-header-border-hover-light"),
        },
        main: {
          "base-50": withOpacity("--color-main-base-50"),
          "base-100": withOpacity("--color-main-base-100"),
          base: withOpacity("--color-main-base"),
          primary: withOpacity("--color-main-primary"),
          "primary-100": withOpacity("--color-main-primary-100"),
          "primary-hover": withOpacity("--color-main-primary-hover"),
          secondary: withOpacity("--color-main-secondary"),
          info: withOpacity("--color-main-info"),
          success: withOpacity("--color-main-success"),
          "success-100": withOpacity("--color-main-success-100"),
          danger: withOpacity("--color-main-danger"),
          "danger-100": withOpacity("--color-main-danger-100"),
          light: withOpacity("--color-main-light"),
          dark: withOpacity("--color-main-dark"),
        },
        status: {
          online: {
            light: withOpacity("--color-status-online-bg-light"),
            dark: withOpacity("--color-status-online-bg-dark"),
          },
          offline: {
            light: withOpacity("--color-status-offline-bg-light"),
            dark: withOpacity("--color-status-offline-bg-dark"),
          },
          busy: {
            light: withOpacity("--color-status-busy-bg-light"),
            dark: withOpacity("--color-status-busy-bg-dark"),
          },
        },
        badge: {
          primary: withOpacity("--color-badge-bg-primary"),
          secondary: withOpacity("--color-badge-bg-secondary"),
          info: withOpacity("--color-badge-bg-info"),
          success: withOpacity("--color-badge-bg-success"),
          danger: withOpacity("--color-badge-bg-danger"),
          light: withOpacity("--color-badge-bg-light"),
          dark: withOpacity("--color-badge-bg-dark"),
        },
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity("--color-fill"),
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
}

