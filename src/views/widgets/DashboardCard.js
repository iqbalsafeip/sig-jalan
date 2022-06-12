import React from 'react';
import {
    CCardFooter,
    CWidgetIcon,
    CLink
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const DashboardCard = props => (
    <CWidgetIcon
        text={props.text} 
        header={(props.count).toString()} 
        color={props.color}
        iconPadding={false}
        footerSlot={
            <CCardFooter className="card-footer px-3 py-2">
            <CLink
                className="font-weight-bold font-xs btn-block text-muted"
                href="https://coreui.io/"
                rel="noopener norefferer" 
                target="_blank"
            >
                View more
                <CIcon name="cil-arrow-right" className="float-right" width="16"/>
            </CLink>
            </CCardFooter>
        }
    >
        <CIcon width={32} name={props.icon} className="mx-4"/>
    </CWidgetIcon>
)

export default DashboardCard;