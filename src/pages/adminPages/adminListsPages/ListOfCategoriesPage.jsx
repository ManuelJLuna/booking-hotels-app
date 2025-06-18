import { useContext } from 'react';
import './adminListsStyles.css'
import { UserContext } from '../../../context/userContext/UserContext';
import { CategoryContext } from '../../../context/categoryContext/CategoryContext';

export const ListOfCategoriesPage = () => {

    // This page is only available for admin users on PC
    const { logedUser } = useContext(UserContext)

    // It imports the categoryContext
    const context = useContext(CategoryContext);

    // If the context is null, it parses the context to an empty array
    const categories = context?.category || [];

    //This lets the admin delete a category from the list using the category ID
    const handleDeleteCategory = (categoryId) => {
        if (confirm("Are you sure you want to delete this category?")) { // Uses a confirm box to ask for confirmation
            context.deleteCategory(categoryId); // If the user confirms it deletes the category
            alert("Category deleted successfully"); // It shows an alert to confirm the deletion
        } else {
            alert("Category not deleted"); // If the user doesn't confirm it shows an alert to confirm the cancellation
        }
    }

    // It uses a table from Bootstrap to show the list of categories
    return (
        <>
            {logedUser && logedUser.role == "admin" ?
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Category</th>
                                <th scope="col">Description</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category.id}>
                                    <th scope="row">{category.id}</th>
                                    <td>{category.category}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => handleDeleteCategory(category.id)}>
                                            <i className='bx bxs-trash' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className='adminErrorAccess'>Esta pagina solo esta disponible en PC</p>
                </>
                :
                <p className='adminErrorAccessAcount'>Inicia sesion en una cuenta admin para poder acceder a esta pagina</p>
            }
        </>
    )
}