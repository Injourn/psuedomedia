import React from "react";
import AccountProfile from "./AccountProfile";
import { OverlayTrigger, Popover } from "react-bootstrap";


function ProfilePopover(props){
    return(<OverlayTrigger
        trigger="click"
        placement="right"
        transition={false}
        overlay={
            (<div>
                <AccountProfile profileId={props.userId} displayName={props.displayName} />
            </div>)
        }
    >
        <b>{props.displayName}</b>
    </OverlayTrigger>)
}

export default ProfilePopover;