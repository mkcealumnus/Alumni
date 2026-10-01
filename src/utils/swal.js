import Swal from 'sweetalert2';

/**
 * Dark-theme-aware SweetAlert2 configuration.
 * Call getSwalOpts() at fire-time so it picks up the current theme.
 */
export const getSwalOpts = () => {
  const isDark = document.body.classList.contains('dark-theme');
  return {
    background: isDark ? '#1a1a1a' : '#fff',
    color: isDark ? '#e8e8e8' : '#1f2937',
    confirmButtonColor: '#d4a574',
  };
};

/** Fire a themed SweetAlert — merges dark-mode opts automatically */
export const swalFire = (opts = {}) => Swal.fire({ ...getSwalOpts(), ...opts });

/** Themed success toast (auto-close, no confirm button) */
export const swalSuccess = (title, text, extra = {}) =>
  swalFire({ icon: 'success', title, text, timer: 1500, showConfirmButton: false, ...extra });

/** Themed error alert */
export const swalError = (title, text, extra = {}) =>
  swalFire({ icon: 'error', title, text, ...extra });

/** Themed warning confirmation dialog */
export const swalConfirm = (title, text, extra = {}) =>
  swalFire({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#333',
    confirmButtonText: 'Confirm',
    ...extra,
  });

export default Swal;
