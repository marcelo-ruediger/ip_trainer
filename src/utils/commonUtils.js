export const resetInputBorders = () => {
    document.querySelectorAll("input, select").forEach((element) => {
        element.classList.remove("correct", "wrong", "empty");
    });
};
