import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    MapView,
    SegmentedControlIOS,
    Image,
} from 'react-native';

const mapViewData = {
    data: {
        dinfo: {
            name: "北京***酒店",
            gpoint: "40.36363,116.673386",
        },
        park: [
            {
                gpoint: "40.395658,116.675962",
                distance: "距离：3.6公里",
                name: "雁栖湖"
            },
            {
                gpoint: "40.374875,116.625050",
                distance: "距离：4.3公里",
                name: "红螺寺"
            },
            {
                gpoint: "40.396220,116.645400",
                distance: "距离：4.3公里",
                name: "北京镭战俱乐部"
            },
            {
                gpoint: "40.339976,116.621607",
                distance: "距离：5.1公里",
                name: "东方普罗旺斯薰衣草庄园"
            },
            {
                gpoint: "40.315427,116.628642",
                distance: "距离：6.6公里",
                name: "汉代铸币遗址"
            },
            {
                gpoint: "40.298885,116.677925",
                distance: "距离：7.2公里",
                name: "老爷车博物馆"
            },
            {
                gpoint: "40.396219,116.584793",
                distance: "距离：8.3公里",
                name: "灵慧山生态景区"
            },
            {
                gpoint: "40.443959,116.661130",
                distance: "距离：9.0公里",
                name: "九谷口风景区"
            },
            {
                gpoint: "40.444303,116.662086",
                distance: "距离：9.0公里",
                name: "怀北国际滑雪场"
            },
            {
                gpoint: "40.278070,116.672750",
                distance: "距离：9.5公里",
                name: "凤翔寺"
            }
        ],
        restaurant: [
            {
                gpoint: "40.373830,116.628990",
                distance: "距离：3.9公里",
                name: "虹鳟鱼一条街"
            }
        ],
        traffic: [
            {
                gpoint: "39.791244,116.397156",
                distance: "距离：67.9公里",
                name: "北京南苑机场"
            },
            {
                gpoint: "39.941415,116.825844",
                distance: "距离：48.8公里",
                name: "燕郊站"
            }
        ],
        ent: [
            {
                gpoint: "40.363877,116.640555",
                distance: "距离：2.8公里",
                name: "北京生存岛实践基地"
            },
            {
                gpoint: "40.341320,116.640170",
                distance: "距离：3.8公里",
                name: "怀柔区图书馆"
            }
        ]
    }
}

export default class TestMapView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            annotations:[],
            mapRegion:{
                latitude: 39.93,
                longitude: 116.39,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
            }
        }
    }

    _showAnnotationsByType(event) {
        this.segmentControlIndex = event.nativeEvent.selectedSegmentIndex
        this._setHotelPointAndAroundPoint()
    }

    // 根据数据类型展示annotations
    _formatAroundDataToAnnotations(needFormatPoint: String, index: Number, title:String, subTitle:String, complexParam:object, isHotel:Boolean):object {
        let latlong = needFormatPoint;
        if(latlong && latlong.length > 0) {
            let arrayLatLong = latlong.split(",");
            if(arrayLatLong.length === 2) {
                let latitude;
                let longitude;

                // 判断获取经纬度
                let value0 = parseFloat(arrayLatLong[0]);
                let value1 = parseFloat(arrayLatLong[1]);

                if (value0 > 90.0 || value0 < -90.0) {
                    latitude = value1;
                    longitude = value0;
                }
                else {
                    latitude = value0;
                    longitude = value1;
                }

                // 经纬度合法
                if(((latitude < 90.0) && (latitude > -90.0)) && ((longitude < 180.0) && (longitude > -180.0))) {
                    complexParam.isLonLatExist = true;

                    // 校正经纬度范围
                    if(latitude > complexParam.maxLatitude) {
                        complexParam.maxLatitude = latitude;
                    }

                    if(latitude < complexParam.minLatitude) {
                        complexParam.minLatitude = latitude;
                    }

                    if(longitude > complexParam.maxLongitude) {
                        complexParam.maxLongitude = longitude;
                    }

                    if(longitude < complexParam.minLongitude) {
                        complexParam.minLongitude = longitude;
                    }

                    let annotationViewIndex = index + 1;

                    let imageSource = 'image!HDetailMapHotel';
                    let id = ('{' + '"T":' + this.segmentControlIndex + ',' + '"I":' + annotationViewIndex + '}');
                    if (isHotel){
                        id = '{"T":-1,"I":0}';
                    } else if (this.segmentControlIndex === 0) {
                        imageSource = 'image!MapRestaurant';
                    } else if (this.segmentControlIndex === 1) {
                        imageSource = 'image!MapEntertainment';
                    } else if (this.segmentControlIndex === 2) {
                        imageSource = 'image!MapViewpoint';
                    } else if (this.segmentControlIndex === 3) {
                        imageSource = 'image!MapTraffic';
                    }

                    return {
                        latitude: latitude,
                        longitude: longitude,
                        title: title,
                        id: id,
                        image:(<View style={{width:44,height:44}} backgroundColor='red'></View>),
                        subtitle: subTitle,
                        rightCalloutView:(<View style={{width:44,height:44}} backgroundColor='red'></View>),
                        onRightCalloutPress:this._clickItem,
                    };
                }
            }
        }
        return null
    }

    _calloutpress(){
        console.log('点击了右边的按钮')
    }

    _resetMapRegion(regionInfo: object) {
        // 设置mapRegion
        if (regionInfo.isLonLatExist) {
            this.setState({
                mapRegion : {
                    latitude: (regionInfo.maxLatitude + regionInfo.minLatitude) / 2,
                    longitude: (regionInfo.maxLongitude + regionInfo.minLongitude) / 2,
                    latitudeDelta: regionInfo.maxLatitude - regionInfo.minLatitude,
                    longitudeDelta: regionInfo.maxLongitude - regionInfo.minLongitude,
                }
            })
        }
        // 设成默认值
        else {
            this.setState({
                mapRegion:{
                    latitude: 39.93,
                    longitude: 116.39,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                }
            })
        }
    }

    _buildHotelCoordinate(hotelAnnotation: Object) {
        if (hotelAnnotation &&
            typeof hotelAnnotation.latitude !== 'undefined' &&
            typeof hotelAnnotation.longitude !== 'undefined' &&
            !(hotelAnnotation.latitude === 0 && hotelAnnotation.longitude === 0)) {
            this._hotelCoordinate = {
                latitude: hotelAnnotation.latitude,
                longitude: hotelAnnotation.longitude,
            };
        }
        else {
            this._hotelCoordinate = undefined
        }
    }

    _setHotelPointAndAroundPoint() {

        let referenceParam = {
            isLonLatExist:false,
            minLatitude:90,
            minLongitude:180,
            maxLatitude:-90,
            maxLongitude:-180,
        };

        this.Annotations = [];
        let hotelAnnotation = this._formatAroundDataToAnnotations(mapViewData.data.dinfo.gpoint, 0,mapViewData.data.dinfo.name,"0.0kkm",referenceParam,true);
        if (hotelAnnotation) {
            this.Annotations.push(hotelAnnotation);
        }

        // 缓存当前的酒店经纬度
        this._buildHotelCoordinate(hotelAnnotation)

        if (this.segmentControlIndex === 0) {
            let arrayHDetailRestaurant = mapViewData.data.restaurant;
            if (arrayHDetailRestaurant && arrayHDetailRestaurant.length > 0) {
                for (let i = 0; i < arrayHDetailRestaurant.length; i++) {
                    let currentRestaurant = arrayHDetailRestaurant[i];
                    let tempHotelAnnotation = this._formatAroundDataToAnnotations(currentRestaurant.gpoint, i,currentRestaurant.name,currentRestaurant.distance,referenceParam,false);
                    if (tempHotelAnnotation) { this.Annotations.push(tempHotelAnnotation); }
                }
            }
        } else if (this.segmentControlIndex === 1) {
            let arrayHDetailEntertainment = mapViewData.data.ent;
            if (arrayHDetailEntertainment && arrayHDetailEntertainment.length > 0) {
                for (let i = 0; i < arrayHDetailEntertainment.length; i++) {
                    let currentEntertainment = arrayHDetailEntertainment[i];
                    let tempHotelAnnotation = this._formatAroundDataToAnnotations(currentEntertainment.gpoint, i,currentEntertainment.name,currentEntertainment.distance,referenceParam,false);
                    if (tempHotelAnnotation) { this.Annotations.push(tempHotelAnnotation); }
                }
            }
        } else if (this.segmentControlIndex === 2) {
            let arrayHDetailScenery = mapViewData.data.park;
            if (arrayHDetailScenery && arrayHDetailScenery.length > 0) {
                for (let i = 0; i < arrayHDetailScenery.length; i++) {
                    let currentScenery = arrayHDetailScenery[i];
                    let tempHotelAnnotation = this._formatAroundDataToAnnotations(currentScenery.gpoint, i,currentScenery.name,currentScenery.distance,referenceParam,false);
                    if (tempHotelAnnotation) { this.Annotations.push(tempHotelAnnotation); }
                }
            }
        } else if (this.segmentControlIndex === 3) {
            let arrayHDetailTraffic = mapViewData.data.traffic;
            if (arrayHDetailTraffic && arrayHDetailTraffic.length > 0) {
                for (let i = 0; i < arrayHDetailTraffic.length; i++) {
                    let currentTraffic = arrayHDetailTraffic[i];
                    let tempHotelAnnotation = this._formatAroundDataToAnnotations(currentTraffic.gpoint, i,currentTraffic.name,currentTraffic.distance,referenceParam,false);
                    if (tempHotelAnnotation) { this.Annotations.push(tempHotelAnnotation); }
                }
            }
        }

        this._resetMapRegion(referenceParam)

        this.setState({
            annotations:this.Annotations
        })
    }

    _clickItem(annotation:string) {
        cosole.log("右边的按钮现在正在被点击")
    }

    _onRegionChange() {
        // 当拖拽地图的时候就将当前酒店或是当前位置重置
        console.log("地图正在被拖动")
    }

    _userLocationChange(coordinate: Object) {
        console.log("用户坐标正在变化")
    }

    render() {
        return (
            <View style={styles.container}>
                <View backgroundColor='#1ba9ba' style={styles.segControlView}>
                    <SegmentedControlIOS  enabled={true}
                                          style={styles.segmentControl}
                                          tintColor="white"
                                          values={['餐饮', '娱乐', '景点', '交通']}
                                          backgroundColor='#1ba9ba'
                                          onChange = {this._showAnnotationsByType.bind(this)}
                    />
                </View>
                <View style={styles.map}>
                    <MapView style={styles.map}
                             showsUserLocation={true}
                             showsCompass={false}
                             region = {this.state.mapRegion}
                             onRegionChange={this._onRegionChange}
                             onUserLocationChange={this._userLocationChange}
                             annotations={this.state.annotations} />
                </View>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    segControlView:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        height: 46,
    },
    segmentControl: {
        height:26,
    },
    map: {
        backgroundColor: 'white',
        flex: 1,
    }
})