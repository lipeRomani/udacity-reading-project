
export const resumeText = (text, maxLength) => {
    return text.length <= maxLength ? text.trim() : text.trim().substring(0, maxLength).concat("...");
}