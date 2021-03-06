import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
    const {_id, name, slots } = treatment;
    const [user, loading, error] = useAuthState(auth);
    
    const formatedDate = format(date, 'PP')
    

    const handleSubmit = e => {
        e.preventDefault()
        const slot = e.target.slot.value;
        
        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formatedDate,
            slot: slot,
            patient: user.email,
            patientName: user.displayName,
            phone: e.target.phone.value
        }

        // post booking to databse
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                toast(`Appointment has set ${formatedDate} at ${slot}`)
            }
            else{
                toast.error(`Already have an appointment ${formatedDate} at ${slot}`)
            }
            refetch()
            // close the Modal
            setTreatment({})
        })

    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-2xl text-secondary">{name}</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 justify-items-center mt-4'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />
                        <select name='slot' className="select select-bordered w-full max-w-xs">

                            {slots?.map((slot, index) => <option
                            key={index} 
                            value={slot}
                            >{slot}</option>)}

                        </select>

                        <input type="text" name='name' disabled value={user?.displayName} className="input input-bordered w-full max-w-xs" />
                        <input type="email" name='email' disabled value={user?.email} className="input input-bordered w-full max-w-xs" />
                        <input type="number" name='phone' placeholder="Phone Number" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="Submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;