/// Public ///
/**
 * Adds listeners for opening/closing info and tutorial modals
 */
const listenModals = () => {
  // info modal //
  // get elements
  const infoBtn = document.querySelector(".modal-buttons__info-btn");
  const infoCloseBtn = document.querySelector(".info-modal__close-btn");
  const infoModal = document.querySelector(".info-modal");
  const infoModalWrapper = document.querySelector(".info-modal__wrapper");
  // open modal with button
  infoBtn.addEventListener("click", () => {
    infoModal.showModal();
  });
  // close modal with button
  infoCloseBtn.addEventListener("click", () => {
    infoModal.close();
  });
  // close modal by clicking outside
  infoModal.addEventListener("click", () => {
    infoModal.close();
  });
  infoModalWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // tutorial modal //
  // get elements
  const tutorialBtn = document.querySelector(".modal-buttons__tutorial-btn");
  const tutorialCloseBtns = document.querySelectorAll(
    ".tutorial-modal__close-btn",
  );
  const tutorialModal = document.querySelector(".tutorial-modal");
  const tutorialModalWrappers = document.querySelectorAll(
    ".tutorial-modal__wrapper",
  );
  // open modal with button
  tutorialBtn.addEventListener("click", () => {
    tutorialModal.showModal();
  });
  // close modal with button
  tutorialCloseBtns.forEach((tutorialCloseBtn) => {
    tutorialCloseBtn.addEventListener("click", () => {
      tutorialModal.close();
    });
  });
  // close modal by clicking outside
  tutorialModal.addEventListener("click", () => {
    tutorialModal.close();
  });
  tutorialModalWrappers.forEach((tutorialModalWrapper) => {
    tutorialModalWrapper.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
};

export default listenModals;
