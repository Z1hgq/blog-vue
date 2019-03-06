<template>
<div>
    <div>
        <Input type="text" id="txt" placeholder="input here" />
        <br>
        <p id="show"></p>
    </div>
    <pre v-highlightA>
        <code >{{code}}</code>
    </pre>
</div>
    
</template>
<script>
export default {
    name:'JSDataBidirectionaBinding',
    data() {
        return {
            code:`HTML:
    <div id="app">
    <input type="text" id="txt">
    <p id="show"></p>
    </div>
JS:
    var obj = {}
    Object.defineProperty(obj, 'txt', {
        get: function () {
            return obj
        },
        set: function (newValue) {
            document.getElementById('txt').value = newValue
            document.getElementById('show').innerHTML = newValue
        }
    })
    document.addEventListener('keyup', function (e) {
        obj.txt = e.target.value
    })
`
        }
    },
    mounted(){
        var obj = {}
        Object.defineProperty(obj, 'txt', {
            get: function () {
                return obj
            },
            set: function (newValue) {
                document.getElementById('txt').value = newValue
                document.getElementById('show').innerHTML = newValue
            }
        })
        document.addEventListener('keyup', function (e) {
            obj.txt = e.target.value
        })
    }
}
</script>
