import React from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";


export default class App extends  React.Component{

    constructor(props) {
        super(props);

        this.state = {
            loading:  false,
            news: [],
            url: 'https://api.currentsapi.services/v1/search?'
                + 'keywords=Valencia&language=es&'
                + 'apiKey=-S_FMdZzLwMaziY3n0AaaClWBVH7USfVaK2yEPNfYJH-VcUD'
        }
    }

    componentDidMount(){
        this.getNews();
    }

    getNews = () => {
        this.setState({loading: true})

        fetch(this.state.url)
            .then(res => res.json())
            .then(res => {

                this.setState({
                    news: res.news,
                    loading: false
                })
            })
    };

    render() {
        if(this.state.loading) {
            return (
                <View style={styles.app}>
                    <Text style={styles.title}>Cargando Noticias!</Text>
                </View>
            );
        }

        return (
            <View style={styles.app}>
                <Text style={styles.title}>Listado de Noticias!</Text>

                <FlatList
                    data={this.state.news}
                    renderItem={
                        ({item}) => <Text style={styles.text}> {item.title} </Text>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    app: {
        marginHorizontal: "auto",
        maxWidth: 500
    },
    title: {
        fontWeight: "bold",
        fontSize: "1.5rem",
        marginVertical: "1em",
        textAlign: "center"
    },
    text: {
        lineHeight: "1.5em",
        fontSize: "1.125rem",
        marginVertical: "1em",
        textAlign: "center"
    },
});
