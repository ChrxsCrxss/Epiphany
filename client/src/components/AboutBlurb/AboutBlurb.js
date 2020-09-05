import React from "react"
import Card from '@material-ui/core/Card';
import classes from "./AboutBlurb.module.css";


const aboutBlurb = (props) => {


    return (

        <Card className={classes.AboutBlurb}>

            <h2> A place to develop ideas </h2>
            <hr />

            <h3> Purpose of the Site </h3>
            <p>
                This is a website with a simple purpose: to help students and learners
                recognize the philosophical value of their thoughts and to provide a quick
                way to transition from the brainstroming stage of writing to the research
                phase.
            </p>

            <h3> Who Should Use this Site </h3>
            <p>
                Everyone should use this site! You, your friends, your family, your dog!
                Of course, the site was built with undergrduate students in mind. If you are
                in an mandatory writing seminar course or a low-level philosophy course,
                this website is definitely another tool to add to your writerly toolbelt. If,
                on the other hand, you are about to defend a dissertation or submit a
                masters thesis, you are less likely to find this tool very useful - but still
                try it out!
            </p>

            <h3> How to use the Site </h3>
            <p>
                The are a few tools you can take advantage of: getting recommendations from
                premier philosophical sites like the Stanford Encyclopedia of Philosophy and
                the Internet Encyclopedia of Philosophy, getting quick philosophical
                inspiration; getting a quick 'virtual office hours' where your draft is
                analyzed for a thesis statement, keywords, and arguments, and where you are
                presented with questions that can help further your writing process.
            </p>

            <h3> Why did I build this site </h3>
            <p>
                Somewhat of a complex answer to this simple question. I'll break it
                down into two parts.
            </p>
            <p>
                First, I built this site as my first major, independent venture into software
                development. Previously, I was a philosophy graduate student at UCLA. Before that,
                I studied philosophy at Princeton University. Before <em>that</em>, I studied
                philosophy independently in high school and founded a philosophy club.

                Long story short, after 10 years of exploring philosophy, I stumbled into an
                intro to computer science course at UCLA in the Spring of 2019. I fell in love
                with the subject and decided to make a career change.
            </p>
            <p>
                Second, I built this site to make philosophy for accessible and friendly. Philosophy
                gets a bad rep, but it is the singlemost important subject you can study. It teaches you
                that truth is built rather than discovered. <br/><br/>

                Sadly, academic philosophy deserves much of its bad rep. Yes, philosophy is overwhelmingly white
                and male - but its issues go much deeper. Academic philosophy is essentially
                detached from the modern form of life, and this is bad for everyone because we
                desperately non-violent ways of reconciling divergent interpretations of reality. 
                If only there was an ancient subject whose methods could be relied upon to move us toward
                such a goal... 
                 <br/><br/>

                 <em>Philosophy is not useless: philosophy is not being <strong>put</strong> to use.</em>
            </p>
        </Card>

    )

}

export default aboutBlurb; 