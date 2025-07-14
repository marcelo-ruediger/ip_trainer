export const resetInputBorders = () => {
    document.querySelectorAll("input").forEach((input) => {
        input.classList.remove("correct", "wrong");
    });
};
