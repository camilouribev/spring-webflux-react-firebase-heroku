package co.com.sofka.questions.usecases;

import co.com.sofka.questions.QuestionsApplication;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.Review;
import co.com.sofka.questions.reposioties.QuestionRepository;
import co.com.sofka.questions.routers.QuestionRouter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class AddReviewUseCaseTest {
    /*@MockBean
    private QuestionRepository questionRepository;

    @Autowired
    private AddReviewUseCase addReviewUseCase;

    @Autowired
    private WebTestClient webTestClient;


    @Test
    @DisplayName("Test AddReview success")
    public void testAddReview() {
        var testQuestion = new Question();
        testQuestion.setUserId("1");
        testQuestion.setId("XXX");
        testQuestion.setQuestion("Is this testing?");
        testQuestion.setType("Computers");
        testQuestion.setCategory("Various");
        testQuestion.setNumberOfReviews(3);
        testQuestion.setUserReviews( new ArrayList<>());
        testQuestion.setUserEmail("test@test.com");
        testQuestion.setSumOfReviewScores(9);

        var testQuestionDTO = new QuestionDTO();
        testQuestionDTO.setUserId("1");
        testQuestionDTO.setId("XXX");
        testQuestionDTO.setQuestion("Is this testing?");
        testQuestionDTO.setType("Computers");
        testQuestionDTO.setCategory("Various");
        testQuestionDTO.setNumberOfReviews(3);
        testQuestionDTO.setUserEmail("test@test.com");
        testQuestionDTO.setSumOfReviewScores(9);


        var testReview = new Review();
        testReview.setUserId("1");
        testReview.setScore("2");
        testReview.setQuestionId("XXX");


        Mockito.when(questionRepository.save(Mockito.any())).thenReturn(Mono.just(testQuestion));
        var result = addReviewUseCase.addReview(testReview).block();

        Assertions.assertEquals(4, result.getNumberOfReviews());


    }*/

}