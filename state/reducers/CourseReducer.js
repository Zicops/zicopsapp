const courseReducer = ({state, action}) => {
    switch (action.type) {
        case "CREATE_COURSE":
            return [...state, {
                name: action.course.name,
                category: action.course.category,
                subcategory: action.course.subcategory,
                owner: action.course.owner,
                status: 'SAVED'}
              ]
        default:
            return state;
    }
}

export default courseReducer;