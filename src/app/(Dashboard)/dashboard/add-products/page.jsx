
import NavBar from "../_components/headers/NavBar";
import Category from "../_components/Forms/addProduct/category";
import { NewProduct } from "../_components/Forms/addProduct/newProduct";

const page = () => {
  return (
    <div className="w-full  overflow`">
      <NavBar seachBar={false} />
      <div className="flex  min-h-[110vh] mt-3">
        <div className="max-w-full overflow-hidden   w-[90%] flex flex-col items-center  mx-auto  ">
          <div className="flex items-center max-w-5xl w-full justify-between mb-5">
            <h2 className="text-center font-bold text-3xl">Create Product</h2>
            <div className="flex justify-end "><Category /></div>
          </div>


          {/* <AddProduct /> */}
          <NewProduct />
        </div>
      </div>
    </div>
  );
};
export default page;
