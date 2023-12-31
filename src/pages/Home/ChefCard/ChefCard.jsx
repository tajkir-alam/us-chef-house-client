import React, { useState } from 'react';
import { HiThumbUp } from 'react-icons/hi';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';

const ChefCard = ({ chef }) => {
    const { id, name, picture, years_of_experience, num_of_recipes, likes } = chef;

    const [check, setCheck] = useState(likes)
    const [like, setLike] = useState(false);
    const [updateLike, setUpdateLike] = useState(likes);
    const handleLikeBtn = () => {
        if (like === false) {
            const newLike = parseInt(likes) + 1;
            setUpdateLike(newLike);
            setCheck(newLike);
        }
        else {
            const decreaseLike = updateLike - 1;
            setCheck(decreaseLike);
        }
    }

    return (
        <div className="card text-black ">
            <LazyLoad offset={300}  className='lazy'>
                <figure><img src={picture} alt="Shoes" className='w-full h-72 lg:h-64 rounded-t-2xl' /></figure>
            </LazyLoad>
            <div className="card-body shadow-lg shadow-white px-2">
                <h2 className="card-title text-2xl">{name}</h2>
                <li className='font-semibold'>{years_of_experience} years_of_experience</li>
                <li className='font-semibold'>{num_of_recipes} Recipe Created</li>
                <div className="card-actions mt-3 justify-between items-center px-2">
                    <div className='flex items-center gap-2'>
                        <HiThumbUp onClick={() => {
                            setLike(!like)
                            handleLikeBtn()
                        }} className={like ? 'text-4xl text-primary cursor-pointer' : "text-4xl text-slate-600 cursor-pointer"}></HiThumbUp>
                        <p className='font-bold'>{check}</p>
                    </div>
                    <Link to={`/chef-page/${id}`} className="btn btn-primary bg-slate-800">View Recipes</Link>
                </div>
            </div>
        </div>
    );
};

export default ChefCard;