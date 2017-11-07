
export const calculateCommentDaysHelper = (postTimestamp) => {
    const oneDay = 24*60*60*1000;
    const postDate = new Date(postTimestamp);
    const now = new Date();
    const diffDays = Math.round(Math.abs((postDate.getTime() - now.getTime())/(oneDay)));

    if (diffDays === 0) {
        return "Today";
    }

    if (diffDays > 30) {
        return "More then 30 days";
    }

    return `To ${diffDays} day(s)`;
}