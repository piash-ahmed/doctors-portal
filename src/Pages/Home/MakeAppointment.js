import React from 'react';
import doctor from '../../assets/images/doctor.png'
import appointment from '../../assets/images/appointment.png'


const MakeAppointment = () => {
    return (
        <div className="mt-20 mb-12 px-8" style={{background: `url(${appointment})`}}>
            <div className="flex justify-center items-center">
                <img src={doctor} className="max-w-lg mt-[-120px] hidden lg:block" alt=''/>
                <div>
                    <h4 className='text-xl text-secondary font-semibold'>Appointment</h4>
                    <h1 className="text-3xl font-bold text-white">Make an appointment Today</h1>
                    <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>

                    <button className="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default MakeAppointment;