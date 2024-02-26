import React from 'react'

const About = () => {
  return (
    <section className='container mx-auto my-10'>
        <h3 className='flex justify-center opacity-40'>About us</h3>
        <h1 className='flex justify-center text-4xl font-bold opacity-80 mt-3'>We are Finance Consultant</h1>

        <div className='flex justify-between items-center mt-12 px-5'>
            <img className='mx-auto'src="images/about1.png" alt="" />
            <div className='w-[50%] flex-col'>
                <h2 className='text-3xl font-semibold pb-3'>Mtax Online Accounting</h2>            
                <p>Mtax is a leading consultancy firm specializing in comprehensive accounting management solutions. Our dedicated team of experts provides tailored financial advice and strategic planning services, ensuring precision and efficiency in handling your company's accounts. With a commitment to excellence, Mtax empowers businesses to navigate complex financial landscapes, optimize processes, and achieve sustainable growth</p>
            </div>
            
        </div>
    </section>
  )
}

export default About