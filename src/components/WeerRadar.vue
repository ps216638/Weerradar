<template>
    <div id="app">
        <div class="m-auto grid grid-rows-max space-y-6">
            <div class="mx-auto">
                <h1><img :src="ikoon"  /> {{ this.regio }} </h1>
                <p>{{ this.zin }}</p>
                <select>
                    <option @click="selecteer(index)" v-for="(ws, index) in weerstations" :key="index">{{ ws.stationnaam['@regio']}}</option>
                </select>

                <table v-if="this.station" >
                    <tbody>
                    <tr><td>Tijd        </td><td>{{ this.tijdstip }}</td></tr>
                    <tr><td>Regio       </td><td>{{ this.station.stationnaam['@regio'] }}</td></tr>
                    <tr><td>Meetstation </td><td>{{ this.station.stationnaam['#text'] }}</td></tr>
                    <tr><td>Windsnelheid</td><td>{{ this.station.windsnelheidMS }} m/s</td></tr>
                    <tr><td>Zichtmeters </td><td>{{ this.station.zichtmeters }} m</td></tr>
                    <tr><td>Windstoten  </td><td>{{ this.station.windstotenMS }} m/s</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="mx-auto grid grid-cols-3">
                <div>
                    <picture>
                        <source media="(min-width:800px)" srcset="/groot.jpg">
                        <source media="(min-width:400px)" srcset="/midden.jpg">
                        <img src="/klein.jpg" alt="Picture" style="width:256px; height:auto;">
                    </picture>
                </div>
                <div>
                    <img class="w-auto" src="https://api.buienradar.nl/image/1.0/RadarMapNL?w=256&h=256" alt="Buienradar">
                </div>
                <div>
                    <iframe title="Buienradar" class="w-auto" :src="frame" scrolling=no width=256 height=256 frameborder=no></iframe>
                </div>
            </div>
        </div>
        Copyright <a href="https://www.buienradar.nl">Buienradar</a>
    </div>
</template>

<script>


    import axios from "axios";

    export default {
        name: 'WeerRadar',

        data(){
            return {
                station  : undefined,
                ikoon    : "",
                tijdstip : "",
                regio    : '',
                zin      : '',
                frame    : '',
                weerstations: []
            }
        },

        created: function() {
            axios.get('https://api.buienradar.nl/data/public/1.1/jsonfeed')
                .then(response => {
                    this.weerstations = response.data.buienradarnl.weergegevens.actueel_weer.weerstations.weerstation
                    this.toon(0)
                })
        },

        methods: {
            selecteer(e){
                console.log(e)
                this.toon(e)
            },
            toon: function(index){
                this.station = this.weerstations[index]
                const d = new Date(this.station.datum);
                const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                this.tijdstip = d.toLocaleString("nl-NL", options);
                this.regio   = this.station.stationnaam['@regio']
                this.ikoon   = this.station.icoonactueel['#text']
                this.zin     = this.station.icoonactueel['@zin']
                this.frame   = `https://gadgets.buienradar.nl/gadget/zoommap/?lat=${this.station.lat}&lng=${this.station.lon}&overname=2&zoom=8&naam=${this.regio}&size=2&voor=0`
            },
        },
    }
</script>

<style scoped>

</style>