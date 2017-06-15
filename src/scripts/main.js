/**
 * Created by Алексей on 18.03.2017.
 */
import testData from 'Root/testData/indexData.json'
import CommonInit from './common'
import initMap from 'Vendor/core/mapInit'
import style from 'Styles/main.scss'

window.initMap = initMap;
CommonInit(testData, 'requests');

