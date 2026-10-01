import Swal from 'sweetalert2';

/**
 * Theme-aware SweetAlert2 configuration for MKCE Alumni.
 * Uses the institutional navy/blue palette.
 */
export const getSwalOpts = () => {
  return {
    background: '#FFFFFF',
    color: '#0F172A',
    confirmButtonColor: '#12355B',
  };
};

/** Fire a themed SweetAlert — merges theme opts automatically */
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
    confirmButtonColor: '#B91C1C',
    cancelButtonColor: '#475569',
    confirmButtonText: 'Confirm',
    ...extra,
  });

export default Swal;
