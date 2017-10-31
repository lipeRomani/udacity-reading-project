export const SORT_BY_DATE = "SORT_BY_DATE";
export const SORT_BY_VOTE_SCORE = "SORT_BY_VOTE_SCORE";


export const getSortString = (sortType) => {
    if (sortType === SORT_BY_VOTE_SCORE) {
        return '-voteScore';
    }
    return '-timestamp';
}