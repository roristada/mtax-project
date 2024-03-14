import React from 'react'

const Header = () => {
  return (
    <div className=" bg-[#E0F4FF] min-h-[500px] flex justify-center rounded-b-3xl">
      <div className=" container w-[80%] py-14 flex">
        <div className="w-[50%]">
          <h1 className=" text-5xl mb-4 text-[#DA0C81]">
            Mtax
            <span className=" text-[#687EFF]">
              Online Accounting: Payroll Outsourcing
            </span>
          </h1>

          <p className=" text-xl mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            consectetur, doloribus rerum sequi odit earum quos aspernatur
            aperiam, exercitationem harum nulla a illo? Accusamus, repudiandae
            quos qui quia error, culpa exercitationem ab illo libero ad dolores
            perspiciatis, iste beatae veritatis rem rerum voluptas amet esse
            suscipit doloribus odio quibusdam illum! Voluptatibus ratione,
            laboriosam atque sint, nihil nemo sequi reprehenderit provident odit
            sunt, omnis quo officia nisi quas cupiditate iure ipsa asperiores id
            vitae natus neque architecto harum dignissimos quam? Quas totam
            eius, provident dolor repellat, consequuntur unde ea labore alias
            enim sunt maiores, quia vero. Ducimus consequatur accusantium dolor
            tempore?
          </p>
          <div className="flex justify-center w-[90%] ">
            <img
              className=" w-16 h-auto rounded-full mx-3"
              src="images\partner.png"
            />
            <img
              className="w-16 h-auto rounded-full mx-3"
              src="images\partner1.png"
            />
            <img
              className="w-16 h-auto rounded-full mx-3"
              src="images\partner1.png"
            />
            <img
              className="w-16 h-auto rounded-full mx-3"
              src="images\partner1.png"
            />
          </div>
          <div className="w-[100%] mt-10 flex ">
            <button
              type="button"
              className=" h-12 w-[200px] mr-10 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-3xl text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Services
            </button>
            <button
              type="button"
              className="h-12 w-[200px]  rounded-3xl text-gray-900 bg-white border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-500 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="w-[50%] flex justify-end">
          <img
            className="object-cover w-[80%] h-[80%]  rounded-full hidden md:flex"
            src="images\bussiness.jpg"
          />
        </div>
      </div>
     
    </div>
  )
}

export default Header