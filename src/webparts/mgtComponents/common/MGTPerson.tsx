import * as React from 'react';
import styles from '../components/MgtComponents.module.scss';
import { TemplateHelper } from '@microsoft/mgt';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mgt-person': any;
            'template': any;
        }
    }
}

const personDetail: any = {
    displayName: 'Test User',
    mail: 'This is random text.',
};
const personDetail1: any = {
    displayName: 'Test User',
    mail: 'This is random text.',
    personPresence: 'DoNotDisturb',
    personImage: 'https://cdn1.iconfinder.com/data/icons/prettyoffice8/256/Users.png'
};

const MGTPerson: React.FunctionComponent<{}> = (props) => {
    TemplateHelper.setBindingSyntax('[[', ']]');
    return (
        <>
            <div>
                <div className={styles.sectionTitle}>Current Logged-in user using person-query as 'me'</div>
                <mgt-person person-query="me" show-name show-email show-presence></mgt-person>
            </div>
            <div>
                <div className={styles.sectionTitle}>Using person-query with 'Firstname' and 'Lastname'</div>
                <div style={{ display: 'inline-flex' }}>
                    <mgt-person person-query="prad" show-name show-email></mgt-person>
                    <mgt-person person-query="vance" show-name show-email></mgt-person>
                </div>
            </div>
            <div>
                <div className={styles.sectionTitle}>Using user-id property</div>
                <mgt-person user-id="7ba3c6f5-937c-4b72-8a3a-e6ad3baa8d8c" show-name show-email></mgt-person>
            </div>
            <div>
                <div className={styles.sectionTitle}>Current Logged-in user using person-query as 'me' and using person-card</div>
                <mgt-person person-query="me" show-name show-email show-presence person-card='hover'></mgt-person>
            </div>
            <div>
                <div className={styles.sectionTitle}>Using person-details property</div>
                <mgt-person person-details={JSON.stringify(personDetail)} show-name show-email></mgt-person>
            </div>
            <div>
                <div className={styles.sectionTitle}>Using person-details property</div>
                <mgt-person person-details={JSON.stringify(personDetail1)} show-name show-email show-presence></mgt-person>
            </div>
            <div>
                <div className={styles.sectionTitle}>Using view property set to 'avatar','oneline' and 'twolines'</div>
                <div>
                    <div style={{ margin: '5px' }}><mgt-person person-details={JSON.stringify(personDetail)} view="avatar"></mgt-person></div>
                    <div style={{ margin: '5px' }}><mgt-person person-details={JSON.stringify(personDetail)} view="oneline"></mgt-person></div>
                    <div style={{ margin: '5px' }}><mgt-person person-details={JSON.stringify(personDetail)} view="twolines"></mgt-person></div>
                </div>
            </div>
            <div>
                <div>
                    <div style={{ margin: '5px' }}><mgt-person person-query="me" view="avatar"></mgt-person></div>
                    <div style={{ margin: '5px' }}><mgt-person person-query="me" view="oneline"></mgt-person></div>
                    <div style={{ margin: '5px' }}><mgt-person person-query="me" view="twolines"></mgt-person></div>
                </div>
            </div>
            <div>
                <div className={styles.sectionTitle}>Using custom css</div>
                <mgt-person class={styles.customPerson} person-query="vance" show-name show-email></mgt-person>
            </div>
            <div>
                <div className={styles.sectionTitle}>Using templates</div>                
                <mgt-person person-query="vance">                
                    <template data-type="loading">
                        <p>Loading...</p>
                    </template>
                    <template>
                        {/* <div style={{ overflow: 'auto' }}>[[person]]</div> */}
                        <div className={styles.customPersonContainer}>
                            <div className={styles.personImage}><img src="[[personImage]]" /></div>
                            <div><b>Title:</b> [[person.displayName]]</div>
                            <div><b>Job Title:</b> [[person.jobTitle]]</div>
                            <div><b>UPN:</b> [[person.userPrincipalName]]</div>
                            <div><b>Business Phone:</b> [[person.phones[0].number]]</div>
                        </div>
                    </template>
                </mgt-person>
            </div>
        </>
    );
};

export default MGTPerson;