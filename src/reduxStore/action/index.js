import ActionType from './ActionType';

/* Action 생성자 */
export const selectBook = (selectedBook) => {
    return {
        type: ActionType.SELECT_BOOK,
        selectedBook
      }
};