package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.Review;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class AddReviewUseCaseTest {
    @MockBean
    QuestionRepository questionRepository;

    @Mock
    UpdateQuestionUseCase updateQuestionUseCase;

    @SpyBean
    AddReviewUseCase addReviewUseCase;

    @Test
    @DisplayName("Add satisfaction review")
    void setAddReviewTest(){
        List<String> listParameter = new ArrayList<>();
        var questionDTO = new QuestionDTO("id222333", "3erre", "Is this running?",
                "OPEN (LONG OPEN BOX)", "SOFTWARE DEVELOPMENT", 1, 1, listParameter, "test@test.com");

        var question = new Question();
        question.setId("id222333");
        question.setUserId("3erre");
        question.setQuestion("Is this running?");
        question.setType("OPEN (LONG OPEN BOX)");
        question.setCategory("SOFTWARE DEVELOPMENT");
        question.setNumberOfReviews(1);
        question.setSumOfReviewScores(1);
        question.setUserReviews(listParameter);
        question.setUserEmail("test@test.com");

        Mockito.when(questionRepository.findById(Mockito.any(String.class))).thenReturn(Mono.just(question));
        Mockito.when(updateQuestionUseCase.apply(questionDTO)).thenReturn(Mono.just(questionDTO));
        Mockito.when(questionRepository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        var review = new Review();
        review.setUserId("3erre");
        review.setScore("3");
        review.setQuestionId("id222333");

        var resultQuestionDTO = addReviewUseCase.addReview(review);
        assert resultQuestionDTO != null;
        Assertions.assertEquals(resultQuestionDTO.block().getId(), question.getId());
        Assertions.assertEquals(resultQuestionDTO.block().getCategory(), question.getCategory());
        Assertions.assertEquals(4, resultQuestionDTO.block().getNumberOfReviews());


    }
}