"use client";





const Profile = () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    return (<div>
        <h2> Profile</h2>
        <p> Name: {userData?.username}</p>
        <p> Email: {userData?.email}</p>

    </div>);
};

export default Profile;