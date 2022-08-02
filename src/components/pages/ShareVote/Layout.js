import InviteCard from '../../gadgets/InviteCard';
import Email from './Email';
import Link from './Link';

import classes from './Layout.module.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Layout() {

    const [isEmail, setToEmail] = useState(true);
    const [isLink, setToLink] = useState(false);

    const navigate = useNavigate();

    function onSendEmailHandler(emailData) {
        fetch(
            'https://react-project-bf0a1-default-rtdb.firebaseio.com/meetups.json',
            {
                method: 'POST',
                body: JSON.stringify(emailData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(() => {
            navigate('/',{replace: true});
        });
    }

    function useEmail() {
        setToEmail(() => true);
        setToLink(() => false)
    }
    function useLink() {
        setToLink(() => true);
        setToEmail(() => false);
    }

    return (
        <InviteCard>
            <div className={classes.subtitle}>Send to Vote</div>
            <div className={classes.methods}>
                <p>Send via</p>
                <img 
                    className={classes.emailImg} 
                    onClick={useEmail} 
                    src={process.env.PUBLIC_URL + '/icons/email.jpg'} alt="Email"
                />
                <img 
                    className={classes.linkImg} 
                    onClick={useLink} 
                    src={process.env.PUBLIC_URL + '/icons/link.jpg'}alt="Link"
                />
            </div>
            <div className={classes.line}>
                <hr />
            </div>
            {isEmail && (<div><Email onSendEmail={onSendEmailHandler}/></div>)}
            {isLink && (<div><Link /></div>)}
        </InviteCard>
    );
}

export default Layout;
