/**
 * Created by Алексей on 18.03.2017.
 */
import testData from 'Root/testData/odmData.json'
import {classes} from 'Vendor/core/classes'
import {selectFirst} from 'Vendor/core/Selections'
import CommonInit from './common'
import style from 'Styles/odm.scss'

CommonInit(testData, 'approval');

selectFirst("#nav_menu__togler").addEventListener('click', e => {
    classes.toggle(e.target.parentElement, "active");
});
