import * as React from 'react';
import styles from '../components/MgtComponents.module.scss';
import { TemplateHelper } from '@microsoft/mgt';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mgt-person': any;
            'mgt-person-card': any;
            'template': any;
        }
    }
}

const personDetail1: any = {
    displayName: 'Test User',
    mail: 'This is random text.',
    personPresence: 'DoNotDisturb',
    personImage: 'https://cdn1.iconfinder.com/data/icons/prettyoffice8/256/Users.png',
    jobTitle: 'Developer',
    department: 'IT',
    officeLocation: 'Singapore'
};

const MGTPersonCard: React.FC<{}> = (props) => {
    TemplateHelper.setBindingSyntax('[[', ']]');
    return (
        <div style={{ margin: '10px' }}>
            <div>
                <div className={styles.sectionTitle}>Person card with Person component</div>
                <mgt-person person-query="me" show-name show-email show-presence person-card="hover"></mgt-person>
            </div>
            <div>
                <div className={styles.sectionTitle}>Person card as a standalone component</div>
                <mgt-person-card person-query="me" show-name show-email is-expanded></mgt-person-card>
            </div>
            <div>
                <div className={styles.sectionTitle}>Using person-query with 'Firstname' and 'Lastname'</div>
                <div style={{ display: 'inline-flex' }}>
                    <div style={{ marginRight: '5px' }}><mgt-person-card person-query="prad" show-name show-email></mgt-person-card></div>
                    <div><mgt-person-card person-query="vance" show-name show-email></mgt-person-card></div>
                </div>
            </div>
            <div>
                <div className={styles.sectionTitle}>Using person-details property</div>
                <mgt-person-card person-details={JSON.stringify(personDetail1)} show-name show-email show-presence></mgt-person-card>
            </div>
            <div>
                <div className={styles.sectionTitle}>Using custom css</div>
                <mgt-person-card class={styles.customPersonCard} person-query="vance" show-name show-email></mgt-person-card>
            </div>
            <div>
                <div className={styles.sectionTitle}>Using templates</div>
                <mgt-person-card person-query="vance">
                    <template data-type="person-details">
                        <div style={{ display: 'flex' }}>
                            <div className={styles.personImage}><img src="[[personImage]]" /></div>
                            <div className={styles.customPersonCardContainer}>
                                <div><b>Title:</b> [[person.displayName]]</div>
                                <div><b>Job Title:</b> [[person.jobTitle]]</div>
                            </div>
                        </div>
                    </template>
                </mgt-person-card>
            </div>
        </div>
    );
};

export default MGTPersonCard;