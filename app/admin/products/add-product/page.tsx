import AddProductComponent from "../component/productFormComponent";

function AddProduct() {
  return (
    <div className="flex justify-center items-center bg-gray-100 p-6">
      <div className="w-1/2">
        <AddProductComponent></AddProductComponent>
      </div>
    </div>
  );
}

export default AddProduct;
